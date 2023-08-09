<script>
  import { onMount } from 'svelte';
  import { select, scaleLinear, line } from 'd3';

  export let data;
  const width = 600;
  const height = 400;
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let svgRef;

  // Function to draw the hive plot
  function drawHivePlot(svgRef, data) {
    // Extract the required axes from the data
    const axes = [...new Set(data.map(d => d.axes))];

    // Define scales for x and y axes
    const xScale = scaleLinear()
      .domain([0, axes.length - 1])
      .range([margin.left, innerWidth + margin.left]);

    const yScale = scaleLinear()
      .domain([0, 1]) // Assuming normalized data
      .range([innerHeight, margin.top]);

    // Create the line generator
    const lineGenerator = line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.value))
      .curve(curveBundle.beta(1));

    // Select the SVG element and create the plot
    const svg = select(svgRef);

    svg.selectAll('g').remove(); // Clear previous content

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw the lines for each gene
    g.selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => lineGenerator(d.values))
      .style('stroke', 'steelblue')
      .style('stroke-width', 2)
      .style('fill', 'none');
  }

  // When the component mounts, draw the hive plot
  onMount(() => {
    if (data && svgRef) {
      // Draw the hive plot
      drawHivePlot(svgRef, data);
    }
  });
</script>

<div bind:this={svgRef}></div>

<style>
  /* Add any custom styling for the hive plot here */
</style>
