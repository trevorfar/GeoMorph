"use"
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import { RootState } from '../GlobalRedux/store';

interface GeoJsonFeature {
    type: string;
    id: string;
    properties: {
      name: string;
      [key: string]: any;
    };
    geometry: {
      type: string;
      coordinates: any;
    };
  }

interface CountryShapeProps {
  geoJsonPath: string;
}

const CountryShape: React.FC<CountryShapeProps> = ({ geoJsonPath }) => {
    const [geoData, setGeoData] = useState<Record<string, GeoJsonFeature>>({});

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { country } = useSelector((state: RootState) => state.country);

  useEffect(() => {
    const width = 150;
    const height = 150;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const projection = d3.geoMercator();

    const path = d3.geoPath().projection(projection);

    d3.json(geoJsonPath).then((data: any) => {
      svg.selectAll('path').remove(); 

      projection.fitSize([width, height], data);

      svg.selectAll('path')
        .data(data.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', (d: any) => path(d) as string)
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
