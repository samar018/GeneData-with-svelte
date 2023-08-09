
 <!-- GeneData.svelte -->
<script>
  import { onMount } from 'svelte';
  import { select } from 'd3-selection';
  import { scaleLinear } from 'd3-scale';
  import { linkHorizontal } from 'd3-shape';

  let genesData;


  async function showGeneDetails(d) {
    const GeneDetails = (await import('./GeneDetails.svelte')).default;
    const geneDetailsComponent = new GeneDetails({ target: document.body, props: { gene: d } });


  }



  // Fetch the gene data from the URL
  onMount(async () => {
    const response = await fetch('https://vda-lab.github.io/assets/genes.json');
    genesData = await response.json();
    console.log('genesData:', genesData);

    drawGeneOverview();
  });

  function drawGeneOverview() {
    const width = 600;
    const height = 600;
    const radius = 250;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = select('svg.gene-overview')
      .attr('width', width)
      .attr('height', height);

    const chromosomeCircle = svg
      .append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    const xScale = scaleLinear()
      .domain([0, 4000000]) // Replace 4000000 with the maximum gene_start value
      .range([0, Math.PI * 2]);

    const geneLines = svg
      .selectAll('line')
      .data(genesData)
      .enter()
      .append('line')
      .attr('x1', (d) => width / 2 + Math.cos(xScale(d.gene_start)) * radius)
      .attr('y1', (d) => height / 2 + Math.sin(xScale(d.gene_start)) * radius)
      .attr('x2', (d) => width / 2 + Math.cos(xScale(d.gene_start)) * (radius + 10))
      .attr('y2', (d) => height / 2 + Math.sin(xScale(d.gene_start)) * (radius + 10))
      .attr('stroke', 'black')
      .attr('opacity', 0.5);



    geneLines
      .on('mouseover', (event, d) => {
        select(event.currentTarget).attr('opacity', 1).attr('stroke', 'red');
        showGeneName(d.gene_name);
      })
      .on('mouseout', (event) => {
        select(event.currentTarget).attr('opacity', 0.5).attr('stroke', 'black');
        showGeneName(null);
      })
      .on('click', (event, d) => {
        showGeneDetails(d);
      });





    function showGeneName(geneName) {
      svg.select('.gene-name').text(geneName);
    }
  }


   export { genesData };
   
</script>

<style>
  svg {
    display: block;
    margin: auto;
  }

  .gene-name {
    font-size: 18px;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
  }
</style>

<svg class="gene-overview"></svg>
<div class="gene-name"></div>
