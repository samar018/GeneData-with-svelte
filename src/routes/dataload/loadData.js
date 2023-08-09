// loadData.js
export const prerender = true;

export const load = async ({ fetch }) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json');
    const jsonData = await response.json();
    jsonData.forEach((d, i) => {
      d.id = i;
      d.species = "Iris " + d.species;
    });
    return { jsonData };
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    return { jsonData: null };
  }
};

