// data.js
// Data preparation functions

// Function to load genome data from the provided URL
export async function loadGenomeData() {
  const response = await fetch("https://vda-lab.github.io/assets/genes.json");
  const genomeData = await response.json();
  return genomeData;
}

// Function to load gene-gene interaction data from the provided URL
export async function loadInteractionData() {
  const response = await fetch("https://vda-lab.github.io/assets/interactions.json");
  const interactionData = await response.json();
  return interactionData;
}

// Function to preprocess the genome data and extract relevant information
export async function preprocessGenomeData() {
  const genomeData = await loadGenomeData();
  const interactionData = await loadInteractionData();

  // Create a map to store gene-gene interactions
  const geneInteractions = new Map();

  // Iterate through each gene-gene interaction entry
  interactionData.forEach(interaction => {
    const fromId = interaction.from_id;
    const toId = interaction.to_id;
    const interactionType = interaction.function;

    // If the fromId is not in the map, add it with an empty array
    if (!geneInteractions.has(fromId)) {
      geneInteractions.set(fromId, []);
    }

    // Add the interaction to the fromId gene's interactions
    geneInteractions.get(fromId).push({
      toId,
      interactionType,
    });
  });

  // Create an empty array to store processed nodes
  const processedNodes = [];

  // Iterate through each gene entry in the genome data
  genomeData.forEach(gene => {
    // Extract relevant information from the gene entry
    const geneInfo = {
      gene_id: gene.gene_id,
      gene_name: gene.gene_name,
      gene_start: gene.gene_start,
      gene_strand: gene.gene_strand,
      ngn: gene.ngn,
      axes: gene.axes,
      interactions: geneInteractions.get(gene.gene_id) || [], // Add gene-gene interactions to the node
    };

    // Add the extracted gene information to the processedNodes array
    processedNodes.push(geneInfo);
  });

  return processedNodes;
}
