<!-- Hiveplot.svelte -->
<script>
  export let nodes;
  export let interactions;

  // Function to draw the Hiveplot visualization using D3.js
  function drawHiveplot() {
    const svg = d3.select('.hiveplot-container').append('svg').attr('width', 600).attr('height', 600);

    // Your Hiveplot visualization code goes here
    // You can access the nodes and interactions data using the 'nodes' and 'interactions' props

    // Draw the edges connecting the nodes based on interactions
    svg.append('g')
      .selectAll('.edge')
      .data(interactions)
      .enter()
      .append('line')
      .attr('class', 'edge')
      .attr('x1', (d) => {
        const sourceNode = nodes.find((node) => node.gene_id === d.from_id);
        return sourceNode.x;
      })
      .attr('y1', (d) => {
        const sourceNode = nodes.find((node) => node.gene_id === d.from_id);
        return sourceNode.y;
      })
      .attr('x2', (d) => {
        const targetNode = nodes.find((node) => node.gene_id === d.to_id);
        return targetNode.x;
      })
      .attr('y2', (d) => {
        const targetNode = nodes.find((node) => node.gene_id === d.to_id);
        return targetNode.y;
      })
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    // Draw the nodes as circles and add the gene names as labels
    svg.append('g')
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', 10)
      .attr('fill', 'blue');

    svg.append('g')
      .selectAll('.gene-name')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'gene-name')
      .attr('x', (d) => d.x + 15)
      .attr('y', (d) => d.y + 5)
      .text((d) => d.gene_name)
      .attr('pointer-events', 'none')
      .style('font-size', '12px')
      .style('fill', 'red')
      .style('opacity', 0);

    // Add event listeners to handle mouse interactions
    svg.selectAll('.node')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', 'red');
        svg.selectAll('.gene-name').style('opacity', (node) => (node === d ? 1 : 0));
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', 'blue');
        svg.selectAll('.gene-name').style('opacity', 0);
      });
  }
</script>

<style>
  /* Add your Hiveplot styles here */
</style>

<!-- Your Hiveplot visualization code goes here -->
<div class="hiveplot-container">
  <!-- SVG will be appended here -->
</div>
