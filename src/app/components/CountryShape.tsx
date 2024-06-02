import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import { RootState } from '../GlobalRedux/store';

interface CountryShapeProps {
  geoJsonPath: string;
}

const CountryShape: React.FC<CountryShapeProps> = ({ geoJsonPath }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { country } = useSelector((state: RootState) => state.country);

  useEffect(() => {
    const width = 200;
    const height = 200;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const projection = d3.geoMercator();

    const path = d3.geoPath().projection(projection);

    d3.json(geoJsonPath).then((data: any) => {
      svg.selectAll('path').remove(); // Clear any existing paths

      // Adjust the projection to fit the size of the SVG canvas
      projection.fitSize([width, height], data);

      svg.selectAll('path')
        .data(data.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', '#ccc')
        .attr('stroke', '#333');
    }).catch((error: any) => {
      console.error('Error loading GeoJSON data:', error);
    });
  }, [geoJsonPath, country]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default CountryShape;
