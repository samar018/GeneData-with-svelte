import { select, hierarchy, cluster, linkHorizontal, scaleOrdinal, schemeCategory10 } from 'd3';

// Function to draw the hive plot
export default function hivePlot(container, data) {
  // Set up the dimensions and margins of the plot
  const width = 500;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Select the SVG container
  const svg = select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Create a hierarchy layout
  const root = hierarchy(data);

  // Create a cluster layout to position the nodes
  const clusterLayout = cluster().size([2 * Math.PI, innerHeight / 2]);

  // Compute the positions of the nodes
  clusterLayout(root);

  // Define a custom link generator for curved links
  const linkGenerator = linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x);

  // Add links between the nodes
  svg
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', linkGenerator);

  // Add nodes
  const nodes = svg
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `rotate(${(d.x * 180) / Math.PI - 90})translate(${d.y})`)
    .append('circle')
    .attr('r', 5)
    .attr('fill', (d) => colorScale(d.data.axes));

  // Create a color scale for different node types
  const colorScale = scaleOrdinal().domain(['regulator', 'workhorse', 'manager']).range(schemeCategory10);

  // Add node labels
  nodes
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', (d) => (d.x < Math.PI === !d.children ? 6 : -6))
    .attr('text-anchor', (d) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
    .attr('transform', (d) => (d.x >= Math.PI ? 'rotate(180)' : null))
    .text((d) => d.data.ngn);
}
