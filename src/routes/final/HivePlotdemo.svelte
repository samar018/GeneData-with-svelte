<!-- final/HivePlot.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let genesData;
  export let interactionsData;

  
  let width = 600;
  let height = 600;
  const radiusScale = d3.scaleLinear().domain([0, 1]).range([50, 300]);

  function degrees(radians) {
    return radians / Math.PI * 180 - 90;
  }

  function drawInteractionPath(interaction, genesData) {
    const sourceGene = genesData.find(gene => gene.gene_id === interaction.from_id);
    const targetGene = genesData.find(gene => gene.gene_id === interaction.to_id);

    const sourceX = width / 2 + radiusScale(sourceGene.gene_start) * Math.cos(degrees(2 * Math.PI / 3) - Math.PI / 2);
    const sourceY = height / 2 + radiusScale(sourceGene.gene_start) * Math.sin(degrees(2 * Math.PI / 3) - Math.PI / 2);
    const targetX = width / 2 + radiusScale(targetGene.gene_start) * Math.cos(degrees(2 * Math.PI / 3) - Math.PI / 2);
    const targetY = height / 2 + radiusScale(targetGene.gene_start) * Math.sin(degrees(2 * Math.PI / 3) - Math.PI / 2);

    const controlX = (sourceX + targetX) / 2;
    const controlY = (sourceY + targetY) / 2;

    return `M ${sourceX},${sourceY} Q ${controlX},${controlY} ${targetX},${targetY}`;
  }

  function createHivePlot(genesData, interactionsData) {
    const svg = d3.select("#chart")
      .attr("width", width)
      .attr("height", height);

    const axes = [
      { key: "regulator", angle: 2 * Math.PI / 3, color: "red" },
      { key: "workhorse", angle: 4 * Math.PI / 3, color: "green" },
      { key: "manager", angle: 0, color: "yellow" }
    ];

    const axisLines = svg.selectAll(".axis")
      .data(axes)
      .enter().append("line")
      .attr("class", "axis")
      .attr("transform", d => `rotate(${degrees(d.angle)})`)
      .attr("x1", radiusScale(0))
      .attr("x2", radiusScale(1))
      .style("stroke", d => d.color)
      .style("opacity", 0.5);

    const linksGroup = svg.append("g")
      .attr("class", "links")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const links = linksGroup.selectAll(".link")
      .data(interactionsData)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d => drawInteractionPath(d, genesData))
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-opacity", 0.3)
      .on("mouseover", function () {
        d3.select(this).style("stroke", "red").style("stroke-width", 5).style("stroke-opacity", 0.8);
      })
      .on("mouseout", function () {
        d3.select(this).style("stroke", "black").style("stroke-width", 1).style("stroke-opacity", 0.3);
      });

    const genesGroup = svg.append("g")
      .attr("class", "genes")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const genes = genesGroup.selectAll(".gene")
      .data(genesData)
      .enter().append("circle")
      .attr("class", "gene")
      .attr("cx", d => radiusScale(d.gene_start) * Math.cos(degrees(2 * Math.PI / 3) - Math.PI / 2))
      .attr("cy", d => radiusScale(d.gene_start) * Math.sin(degrees(2 * Math.PI / 3) - Math.PI / 2))
      .attr("r", 2)
      .style("fill", d => {
        if (d.axes === "regulator") return "red";
        else if (d.axes === "manager") return "yellow";
        else if (d.axes === "workhorse") return "green";
        else return "black";
      });
  }

  onMount(() => {
    createHivePlot(genesData, interactionsData);
  });
</script>

<svg id="chart" width="600" height="600"></svg>

<style>
  .axis {
    stroke-width: 2;
  }
</style>
