export const fetchGeoJSONData = async () => {
  const response = await fetch('/api/geojson');
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};