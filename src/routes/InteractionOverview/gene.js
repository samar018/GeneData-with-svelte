// genes.js
export async function fetchGenesData() {
  const response = await fetch('https://vda-lab.github.io/assets/genes.json');
  const genesData = await response.json();
  return genesData;
}