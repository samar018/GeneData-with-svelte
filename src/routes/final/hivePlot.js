// function createHivePlot(genesData, interactionsData) {
//   // Set up the SVG canvas
//   const width = 600;
//   const height = 600;
//   const svg = d3.select("#chart")
//     .attr("width", width)
//     .attr("height", height);

//   // Define colors for different gene types
//   const colorScale = d3.scaleOrdinal()
//     .domain(["regulator", "manager", "workhorse"])
//     .range(["red", "yellow", "green"]);

//   // Define scales for positioning genes along each axis
//   const majorAngle = (2 * Math.PI) / 3;
//   const minorAngle = Math.PI / 12;

//   const angleScale = d3.scaleOrdinal()
//     .domain(["source", "source-target", "target-source", "target"])
//     .range([0, majorAngle - minorAngle, majorAngle + minorAngle, 2 * majorAngle]);

//   const radiusScale = d3.scaleLinear()
//     .domain([0, genesData.length - 1])
//     .range([50, 300]);

//   // Draw the axes
//   const axes = ["regulator", "manager", "workhorse"];
//   svg.selectAll(".axis")
//     .data(axes)
//     .enter().append("line")
//     .attr("class", "axis")
//     .attr("transform", d => `rotate(${degrees(angleScale(d))})`)
//     .attr("x1", -10)
//     .attr("x2", radiusScale(genesData.length - 1) + 10);

//   // Draw the genes
//   svg.append("g")
//     .attr("class", "genes")
//     .selectAll(".gene")
//     .data(genesData)
//     .enter().append("circle")
//     .attr("class", "gene")
//     .attr("cx", (d, i) => Math.cos(angleScale(d.axes)) * radiusScale(i))
//     .attr("cy", (d, i) => Math.sin(angleScale(d.axes)) * radiusScale(i))
//     .attr("r", 2)
//     .attr("fill", d => colorScale(d.axes));

//   // Draw the interactions
//   svg.append("g")
//     .attr("class", "interactions")
//     .selectAll(".interaction")
//     .data(interactionsData)
//     .enter().append("path")
//     .attr("class", "interaction")
//     .attr("d", d => drawInteractionPath(d, genesData))
//     .style("opacity", 0.3)
//     .on("mouseover", function () {
//       d3.select(this).style("stroke", "red").style("stroke-width", 5).style("opacity", 0.8);
//     })
//     .on("mouseout", function () {
//       d3.select(this).style("stroke", "black").style("stroke-width", 1.5).style("opacity", 0.3);
//     });
// }

// // Helper function to convert radians to degrees
// function degrees(radians) {
//   return radians / Math.PI * 180 - 90;
// }

// // Helper function to draw a quadratic Bezier curve between two genes
// function drawInteractionPath(interaction, genesData) {
//   const fromGene = genesData.find(d => d.ngn === interaction.from_ngn);
//   const toGene = genesData.find(d => d.ngn === interaction.to_ngn);
//   const r = 150; // distance of control point from the midpoint
//   const x0 = Math.cos(angleScale(fromGene.axes)) * radiusScale(genesData.indexOf(fromGene));
//   const y0 = Math.sin(angleScale(fromGene.axes)) * radiusScale(genesData.indexOf(fromGene));
//   const x1 = Math.cos(angleScale(toGene.axes)) * radiusScale(genesData.indexOf(toGene));
//   const y1 = Math.sin(angleScale(toGene.axes)) * radiusScale(genesData.indexOf(toGene));
//   const mx = (x0 + x1) / 2;
//   const my = (y0 + y1) / 2;
//   const dx = x1 - x0;
//   const dy = y1 - y0;
//   const qx = mx + r * dy / Math.hypot(dx, dy);
//   const qy = my - r * dx / Math.hypot(dx, dy);
//   return `M${x0},${y0}Q${qx},${qy},${x1},${y1}`;
// }
import * as d3 from "d3";
// Load the data
const genes = d3.json("https://vda-lab.github.io/assets/genes.json");
const interactions = d3.json("https://vda-lab.github.io/assets/interactions.json");
// Create a networkx graph
const G = d3.createGraph();
// Add the genes to the graph
for (const gene of genes) {
  G.addNode(gene.ngn);
}
// Add the interactions to the graph
for (const interaction of interactions) {
  G.addEdge(interaction.from_ngn, interaction.to_ngn);
}
// Plot the hiveplot
d3.select("body").append("svg")
  .attr("width", 960)
  .attr("height", 500);
d3.hiveplot(G, {
  nodeColor: genes.axes,
  nodeSize: genes.gene_start,
  edgeColor: "black",
});