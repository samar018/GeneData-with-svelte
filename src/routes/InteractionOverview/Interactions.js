// interactions.js
export async function fetchInteractionsData() {
  const response = await fetch('https://vda-lab.github.io/assets/interactions.json');
  const interactionsData = await response.json();
  return interactionsData;
}