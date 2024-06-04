"use client";

import React, { useEffect, useState } from 'react';
import { RootState } from '../GlobalRedux/store';
import CountryShape from './CountryShape';
import Skeleton from './Skeleton';
import { useSelector } from 'react-redux';
import { fetchGeoJSONData } from '../../utils/fetchGeo';

interface GeoJSONFile {
  name: string;
  path: string;
}

const GameContainer = () => {
  const { country, score } = useSelector((state: RootState) => state.country);
  const [geoJsonPath, setGeoJsonPath] = useState<string | null>(null);

  useEffect(() => {
    const getGeoJsonPath = async () => {
      try {
        const geojsonData: GeoJSONFile[] = await fetchGeoJSONData();
        const matchingFile = geojsonData.find(file => file.name === country);
        if (matchingFile) {
          setGeoJsonPath(matchingFile.path);
        }
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    if (country) {
      getGeoJsonPath();
    }
  }, [country]);

  return (
    <div className="flex flex-col h-72 w-full items-center justify-center">
      <div className="flex flex-row gap-4">
        <div className="flex-col md:flex-row lg:flex-col flex">
          <div className="justify-center items-center flex pb-2 pr-8 md:pb-0 md:pt-4">
            <p className='text-3xl font-bold'>{score}</p>
          </div>
          <div className="">
            {geoJsonPath ? (
              <CountryShape geoJsonPath={geoJsonPath} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="md:flex-row flex-wrap flex gap-4 md:gap-4 pt-12 ">
        {Array.from(country).map((_, idx) => (
          <Skeleton key={idx} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default GameContainer;