import React, { useEffect, useState } from 'react';

interface GeoJSONFile {
  name: string;
  path: string;
}

const GeoJSONSelector: React.FC = () => {
  const [files, setFiles] = useState<GeoJSONFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setFiles(data))
      .catch(error => console.error('Error fetching GeoJSON data:', error));
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(event.target.value);
  };

  const handleButtonClick = () => {
    console.log(selectedFile);
  };

  return (
    <div className="p-4">
      <label htmlFor="geojson-select" className="block mb-2">
        Select a GeoJSON file by name:
      </label>
      <select
        id="geojson-select"
        onChange={handleSelectChange}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="">Select a country</option>
        {files.map((file) => (
          <option key={file.name} value={file.path}>
            {file.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Log File Path
      </button>
    </div>
  );
};

export default GeoJSONSelector;
