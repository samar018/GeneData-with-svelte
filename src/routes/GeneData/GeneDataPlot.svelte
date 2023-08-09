<!-- GenomeScatterPlot.svelte -->
<script>
  import { onMount } from 'svelte';
  import { select } from 'd3-selection';
  import { scaleLinear } from 'd3-scale';

  export let data;
  let svgRef;

  // Function to create the scatter plot
  const createScatterPlot = () => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = scaleLinear().domain([0, 10]).range([0, width]);
    const y = scaleLinear().domain([0, 10]).range([height, 0]);

    const svg = select(svgRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('r', 5)
      .attr('fill', 'steelblue');
  };

  onMount(() => {
    createScatterPlot();
  });
</script>

<svg bind:this={svgRef}></svg>

<style>
  /* Add any custom styling for the scatter plot here */
</style>
