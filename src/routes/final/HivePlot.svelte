<!-- HivePlot.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';


  export let genesData;
  export let interactionsData;
  // Helper function to convert radians to degrees
  function degrees(radians) {
    return radians / Math.PI * 180 - 90;
  }


  console.log("Genes Data:", genesData);
  console.log("Interactions Data:", interactionsData);

  // Helper function to draw a quadratic Bezier curve between two genes
function drawInteractionPath(interactionsData, genesData) {
    const sourceGene = genesData.find(gene => gene.gene_id === interaction.from_id);
    const targetGene = genesData.find(gene => gene.gene_id === interaction.to_id);

    const sourceX = width / 2 + radiusScale(sourceGene.gene_start);
    const sourceY = height / 2;
    const targetX = width / 2 + radiusScale(targetGene.gene_start);
    const targetY = height / 2;

    const controlX = (sourceX + targetX) / 2;
    const controlY = (sourceY + targetY) / 2;

    // Quadratic Bezier curve command
    return `M ${sourceX},${sourceY} Q ${controlX},${controlY} ${targetX},${targetY}`;
  }


function createHivePlot(genesData, interactionsData) {
  // Sample code to visualize genes as circles on the Hive Plot
  const width = 600;
  const height = 600;
  const radiusScale = d3.scaleLinear()
    .domain([0, 1]) // Adjust the domain as per your data
    .range([50, 300]);

  const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

  // Draw the axes first (you can adjust the number of axes based on your requirements)
  const axes = [
    { key: "regulator", angle: 2 * Math.PI / 3, color: "red" },
    { key: "workhorse", angle: 4 * Math.PI / 3, color: "green" },
    { key: "manager", angle: 0, color: "yellow" }
  ];

  const axisLines = svg.selectAll(".axis")
    .data(axes)
    .enter().append("line")
    .attr("class", "axis")
    .attr("transform", d => `translate(${width / 2},${height / 2}) rotate(${degrees(d.angle)})`)
    .attr("x1", 0)
    .attr("x2", radiusScale(1))
    .style("stroke", d => d.color)
    .style("opacity", 0.5);

  // Draw the links (interactions) between genes using the drawInteractionPath function
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
    .style("stroke-opacity", 0.3);

  // Draw the genes as circles on the Hive Plot
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
      if (d.axes === "regulator") {
        return "red";
      } else if (d.axes === "workhorse") {
        return "green";
      } else if (d.axes === "manager") {
        return "yellow";
      } else {
        return "black";
      }
    });

  // Code to handle interactions (e.g., hover, click) on the genes and links
  // ...

  // Sample code for mouseover event on genes
genes.on("mouseover", function (d) {
  // Code to highlight the gene and its links on mouseover
  // Change the color of the gene circle
  d3.select(this).attr("fill", "orange");

  // Get the gene's interactions (links) from the interactionsData
  const geneInteractions = interactionsData.filter(interaction =>
    interaction.from_id === d.gene_id || interaction.to_id === d.gene_id
  );

  // Change the color and opacity of the associated links
  links.style("stroke", link => {
    if (geneInteractions.includes(link)) {
      return "orange";
    } else {
      return "black";
    }
  }).style("stroke-opacity", link => {
    if (geneInteractions.includes(link)) {
      return 0.8;
    } else {
      return 0.3;
    }
  });
});


  // Sample code for click event on links
links.on("click", function (d) {
  // Code to handle click on links
  // For example, you can display additional information about the link in a tooltip
  const tooltip = d3.select("#tooltip");
  tooltip.html(`From: ${d.from_name} (${d.from_id})<br>To: ${d.to_name} (${d.to_id})<br>Function: ${d.function}`)
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + "px")
    .style("opacity", 1);

  // You can also perform additional actions or data manipulation here based on the link data
});

}





  onMount(() => {
    createHivePlot(genesData, interactionsData);
  });
</script>

<svg id="chart" width="600" height="600"></svg>
