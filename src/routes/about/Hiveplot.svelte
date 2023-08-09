<script>
  export let nodes;
  export let interactions;

  // Function to calculate node positions in Hiveplot
  function calculateNodePositions() {
    const numGroups = 3; // Change this based on the number of axes you want to use
    const groupRadius = 200;
    
    const groups = new Array(numGroups).fill().map((_, i) => {
      const angle = (2 * Math.PI * i) / numGroups;
      return {
        x: 300 + groupRadius * Math.cos(angle),
        y: 300 + groupRadius * Math.sin(angle),
      };
    });

    nodes.forEach((node, index) => {
      const groupIndex = node.axes === "regulator"
        ? 0
        : node.axes === "workhorse"
        ? 1
        : node.axes === "manager"
        ? 2
        : -1; // If the axes value is not recognized, put the node in a separate group (optional)
      
      if (groupIndex !== -1) {
        const numNodesInGroup = nodes.filter((n) => n.axes === node.axes).length;
        const angle = (2 * Math.PI * index) / numNodesInGroup;
        const radius = 50; // Change this to adjust the spacing of nodes within each group
        node.x = groups[groupIndex].x + radius * Math.cos(angle);
        node.y = groups[groupIndex].y + radius * Math.sin(angle);
      }
    });
 // Loop over interactions to add edges to nodes
    interactions.forEach((interaction) => {
      const sourceNode = nodes.find((node) => node.gene_id === interaction.from_id);
      const targetNode = nodes.find((node) => node.gene_id === interaction.to_id);

      if (sourceNode && targetNode) {
      // Store edge information as properties of nodes
        sourceNode.edges.push({
         target: targetNode,
      });
    }
  });


  }
    // beforeUpdate(calculateNodePositions);

  // Call the function to calculate node positions
  calculateNodePositions();
</script>

<style>
  /* Add your Hiveplot styles here */
  .hiveplot-container {
    width: 600px;
    height: 600px;
    border: 1px solid #ccc;
  }
  
  .node {
    fill: blue; /* You can set different colors based on the axes value */
    r: 10;
  }
  
  .edge {
    stroke: black;
  }
</style>

<!-- Your Hiveplot visualization code goes here -->
<div class="hiveplot-container">
  <svg width="600" height="600">
    <!-- Draw the edges connecting the nodes -->
    <g>
      {#each interactions as interaction}
        {#each nodes as node}
          {#if node.gene_id === interaction.from_id}
            {#each nodes as targetNode}
              {#if targetNode.gene_id === interaction.to_id}
                <line class="edge" x1="{node.x}" y1="{node.y}" x2="{targetNode.x}" y2="{targetNode.y}" />
              {/if}
            {/each}
          {/if}
        {/each}
      {/each}
    </g>
    
    <!-- Draw the nodes -->
    <g>
      {#each nodes as node}
        <circle class="node" cx="{node.x}" cy="{node.y}" />
      {/each}
    </g>
  </svg>
</div>
