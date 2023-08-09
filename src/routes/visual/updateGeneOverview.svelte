<!-- GeneOverview.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  // Define the URL for gene and interaction data
  const genesUrl = 'https://vda-lab.github.io/assets/genes.json';
  const interactionsUrl = 'https://vda-lab.github.io/assets/interactions.json';

  let genesData = [];
  let interactionsData = [];

  onMount(async () => {
    // Fetch gene data
    const genesResponse = await fetch(genesUrl);
    genesData = await genesResponse.json();

    // Fetch gene-gene interaction data
    const interactionsResponse = await fetch(interactionsUrl);
    interactionsData = await interactionsResponse.json();

    // Call the function to calculate node positions and draw the visualization
    calculateNodePositions();
    drawGeneOverview();
  });

  // Function to calculate node positions in the gene overview visualization
  function calculateNodePositions() {
    // Your logic to calculate the positions of nodes goes here
    // For example, you can set the x and y coordinates of each gene based on its properties
    // For genes on the forward strand, place them on the outside of the circle, and for genes on the reverse strand, place them on the inside
    // You can use the 'genesData' to access the gene data and calculate the positions accordingly
    // For simplicity, we'll just log the calculated positions for now
    genesData.forEach((gene) => {
      const angle = (gene.gene_start / 1000000) * (Math.PI / 180); // Convert gene_start to an angle
      const radius = 250;
      gene.x = 300 + radius * Math.cos(angle) * (gene.gene_strand === 'forward' ? 1 : -1);
      gene.y = 300 + radius * Math.sin(angle) * (gene.gene_strand === 'forward' ? 1 : -1);
    });
    console.log('Calculated Node Positions:', genesData);
  }

  // Function to draw the gene overview visualization using D3.js
  function drawGeneOverview() {
    // Your D3.js code to draw the gene overview visualization goes here
    // For now, we'll just log the gene data and interaction data to the console
    console.log('Gene Data:', genesData);
    console.log('Interaction Data:', interactionsData);
    
    // Create an SVG container for the gene overview visualization
    const svg = d3.select('.gene-overview-container')
      .append('svg')
      .attr('width', 600)
      .attr('height', 600);

    // Draw the chromosome circle
    svg.append('circle')
      .attr('cx', 300)
      .attr('cy', 300)
      .attr('r', 250)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // Draw the genes as lines on the circle
    // Draw the genes as lines on the circle and add gene names
    svg.selectAll('.gene-line')
      .data(genesData)
      .enter()
      .append('line')
      .attr('class', 'gene-line')
      .attr('x1', (d) => 300 + 250 * Math.cos((d.gene_start / 1000000) * (Math.PI / 180)) * (d.gene_strand === 'forward' ? 1 : -1))
      .attr('y1', (d) => 300 + 250 * Math.sin((d.gene_start / 1000000) * (Math.PI / 180)) * (d.gene_strand === 'forward' ? 1 : -1))
      .attr('x2', (d) => 300 + 260 * Math.cos((d.gene_start / 1000000) * (Math.PI / 180)) * (d.gene_strand === 'forward' ? 1 : -1))
      .attr('y2', (d) => 300 + 260 * Math.sin((d.gene_start / 1000000) * (Math.PI / 180)) * (d.gene_strand === 'forward' ? 1 : -1))
      .attr('stroke', 'black')
      .attr('stroke-opacity', 0.5)
      .on('mouseover', function(d) {
        d3.select(this)
          .attr('stroke-opacity', 1)
          .attr('stroke', 'red');
        // Show the gene name in the middle of the circle on mouseover
   // Show the gene name in the middle of the circle on mouseover
        svg.append('text')
          .attr('class', 'gene-name')
          .attr('x', 300)
          .attr('y', 300)
          .text(d.gene_name)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .style('font-size', '14px')
          .style('font-weight', 'bold');
      
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .attr('stroke-opacity', 0.5)
          .attr('stroke', 'black');
        // Remove the gene name on mouseout
        svg.select('.gene-name').remove();
      })
      .on('click', function(d) {
        // Open the gene details page on click (you can implement this logic as per your requirements)
        console.log('Clicked Gene:', d.gene_name);
      });

      // Draw the tick marks for every 200,000 positions
    for (let i = 0; i < 360; i += 10) {
      const tickX = 300 + 250 * Math.cos((i / 360) * (2 * Math.PI));
      const tickY = 300 + 250 * Math.sin((i / 360) * (2 * Math.PI));
      
      // Draw tick marks
      svg.append('line')
        .attr('x1', tickX)
        .attr('y1', tickY)
        .attr('x2', 300 + 260 * Math.cos((i / 360) * (2 * Math.PI)))
        .attr('y2', 300 + 260 * Math.sin((i / 360) * (2 * Math.PI)))
        .attr('stroke', 'black');
      
      // Add marker labels
      svg.append('text')
        .attr('x', 300 + 280 * Math.cos((i / 360) * (2 * Math.PI)))
        .attr('y', 300 + 280 * Math.sin((i / 360) * (2 * Math.PI)))
        .text(`${i * 200000}`)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '12px')
        .style('fill', 'black');
    }
  }
</script>

<style>
  /* Add your styles for the gene overview visualization here */
  .gene-overview-container {
    width: 600px;
    height: 600px;
  }
</style>

<div class="gene-overview-container">
  <!-- Gene overview visualization will be drawn here using D3.js -->
</div>
