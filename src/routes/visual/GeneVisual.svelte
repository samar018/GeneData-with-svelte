<!-- GeneVisual.svelte -->
<script>
  // Define the genes data
  let genes = [
    { gene_id: "ECK120001066", gene_start: 18715.0, gene_strand: "forward", gene_name: "nhaR" },
    // Add more genes as needed
  ];

  // Function to handle gene hover
  function handleHover(gene) {
    // Increase opacity of the hovered gene
    gene.opacity = 1;
  }

  // Function to handle gene click
  function handleClick(gene) {
    // Open the gene details page with the gene information
    // You can use Svelte's navigation or router to do this
    // For simplicity, we'll just log the gene details for now
    console.log("Gene Details:", gene);
  }
</script>

<style>
  .chromosome {
    fill: none;
    stroke: black;
    stroke-width: 2;
  }

  .gene-line {
    stroke-width: 2;
    opacity: 0.5;
  }

  .gene-name {
    font-size: 12px;
    text-anchor: middle;
    fill: black;
  }

  .gene-hover {
    stroke: red;
    opacity: 1;
  }
</style>

<svg width="600" height="600">
  <!-- Draw the chromosome circle -->
  <circle class="chromosome" cx="300" cy="300" r="250"></circle>

  <!-- Draw the gene lines and ticks -->
  {#each genes as gene}
    {#if gene.gene_strand === "forward"}
      <!-- Genes on the forward strand are on the outside of the circle -->
      <line
        class="gene-line"
        x1="{300 + 250 * Math.cos(2 * Math.PI * gene.gene_start / 600000)}"
        y1="{300 + 250 * Math.sin(2 * Math.PI * gene.gene_start / 600000)}"
        x2="{300 + 260 * Math.cos(2 * Math.PI * gene.gene_start / 600000)}"
        y2="{300 + 260 * Math.sin(2 * Math.PI * gene.gene_start / 600000)}"
        on:mouseover="{() => handleHover(gene)}"
        on:click="{() => handleClick(gene)}"
      ></line>
    {:else if gene.gene_strand === "reverse"}
      <!-- Genes on the reverse strand are on the inside of the circle -->
      <line
        class="gene-line"
        x1="{300 + 200 * Math.cos(2 * Math.PI * gene.gene_start / 600000)}"
        y1="{300 + 200 * Math.sin(2 * Math.PI * gene.gene_start / 600000)}"
        x2="{300 + 210 * Math.cos(2 * Math.PI * gene.gene_start / 600000)}"
        y2="{300 + 210 * Math.sin(2 * Math.PI * gene.gene_start / 600000)}"
        on:mouseover="{() => handleHover(gene)}"
        on:click="{() => handleClick(gene)}"
      ></line>
    {/if}

    <!-- Add ticks for every 200,000 positions -->
    {#if gene.gene_start % 200000 === 0}
      <line
        class="gene-line"
        x1="{300 + 240 * Math.cos(2 * Math.PI * gene.gene_start / 600000)}"
        y1="{300 + 240 * Math.sin(2 * Math.PI * gene.gene_start / 600000)}"
        x2="{300 + 250 * Math.cos(2 * Math.PI * gene.gene_start / 600000)}"
        y2="{300 + 250 * Math.sin(2 * Math.PI * gene.gene_start / 600000)}"
      ></line>
    {/if}
  {/each}

  <!-- Show gene names when hovering over a gene -->
  {#each genes as gene}
    {#if gene.opacity === 1}
      <text class="gene-name" x="{300 + 255 * Math.cos(2 * Math.PI * gene.gene_start / 600000)}" y="{300 + 255 * Math.sin(2 * Math.PI * gene.gene_start / 600000)}">
        {gene.gene_name}
      </text>
    {/if}
  {/each}
</svg>
