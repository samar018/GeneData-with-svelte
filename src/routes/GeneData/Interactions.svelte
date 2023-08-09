<script>
  import { onMount } from 'svelte';
  import { select } from 'd3-selection';
  import { scaleLinear } from 'd3-scale';
  import GeneDetails from './GeneDetails.svelte';
  let interactionsData;






  // Fetch the interactions data from the URL
  onMount(async () => {
    const response = await fetch('https://vda-lab.github.io/assets/interactions.json');
    interactionsData = await response.json();
    drawHivePlot(); // Call the function to draw the hive plot visual
  });

  function drawHivePlot() {
    const width = 600;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const center = { x: width / 2, y: height / 2 };
    const minDistance = 50;
    const maxDistance = 300;
    const controlPointDistance = 150;

    // Create a nested data structure to group genes based on axes
    const nestedData = d3.nest()
      .key((d) => d.axes) // Group by axes
      .entries(interactionsData);

    // Create scales for x and y positions
    const xScale = scaleLinear()
      .domain([minDistance, maxDistance])
      .range([0, center.x]);

    const yScale = scaleLinear()
      .domain([minDistance, maxDistance])
      .range([0, center.y]);

    // Create SVG
    const svg = select('svg')
      .attr('width', width)
      .attr('height', height);

    // Draw genes
    nestedData.forEach((group) => {
      group.values.forEach((gene) => {
        let x, y;

        if (gene.axes === 'regulator') {
          x = center.x + xScale(gene.gene_start);
          y = center.y - yScale(gene.gene_start);
        } else if (gene.axes === 'manager') {
          x = center.x + xScale(gene.gene_start);
          y = center.y + yScale(gene.gene_start);
        } else if (gene.axes === 'workhorse') {
          x = center.x - xScale(gene.gene_start);
          y = center.y + yScale(gene.gene_start);
        }

        svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 2)
          .attr('fill', (gene.axes === 'regulator' ? 'red' : (gene.axes === 'manager' ? 'yellow' : 'green')));
      });
    });

    // Draw interactions
    interactionsData.forEach((interaction) => {
      const fromGene = interactionsData.find((gene) => gene.gene_id === interaction.from_id);
      const toGene = interactionsData.find((gene) => gene.gene_id === interaction.to_id);

      const fromX = fromGene.axes === 'regulator'
        ? center.x + xScale(fromGene.gene_start)
        : (fromGene.axes === 'manager'
            ? center.x + xScale(fromGene.gene_start)
            : center.x - xScale(fromGene.gene_start));

      const fromY = fromGene.axes === 'regulator'
        ? center.y - yScale(fromGene.gene_start)
        : (fromGene.axes === 'manager'
            ? center.y + yScale(fromGene.gene_start)
            : center.y + yScale(fromGene.gene_start));

      const toX = toGene.axes === 'regulator'
        ? center.x + xScale(toGene.gene_start)
        : (toGene.axes === 'manager'
            ? center.x + xScale(toGene.gene_start)
            : center.x - xScale(toGene.gene_start));

      const toY = toGene.axes === 'regulator'
        ? center.y - yScale(toGene.gene_start)
        : (toGene.axes === 'manager'
            ? center.y + yScale(toGene.gene_start)
            : center.y + yScale(toGene.gene_start));

      const controlX = (fromX + toX) / 2 + controlPointDistance;
      const controlY = (fromY + toY) / 2 + controlPointDistance;

      svg.append('path')
        .attr('d', `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('opacity', 0.3)
        .on('mouseover', function() {
          select(this).attr('stroke', 'red').attr('stroke-width', 5).attr('opacity', 0.8);
        })
        .on('mouseout', function() {
          select(this).attr('stroke', 'black').attr('stroke-width', 1).attr('opacity', 0.3);
        })
        .on('click', () => {
          // Redirect to the details page for the interaction
          // You can use the router or other navigation methods here
        });
    });
  }
</script>


<svelte:head>
  <title>Interactions</title>
</svelte:head>

<!-- Add Context component and pass the gene data as a prop -->
<svelte:context segment="geneContext" let:gene={gene}>
  <GeneDetails {gene} />
</svelte:context>



<!-- Inside the loop of geneLines -->
<circle
  cx={(gene.axes === 'regulator'
    ? center.x + xScale(gene.gene_start)
    : (gene.axes === 'manager'
        ? center.x + xScale(gene.gene_start)
        : center.x - xScale(gene.gene_start)))}
  cy={(gene.axes === 'regulator'
    ? center.y - yScale(gene.gene_start)
    : (gene.axes === 'manager'
        ? center.y + yScale(gene.gene_start)
        : center.y + yScale(gene.gene_start)))}
  r={2}
  fill={(gene.axes === 'regulator' ? 'red' : (gene.axes === 'manager' ? 'yellow' : 'green'))}
/>
