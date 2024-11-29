"use client";

import React, { useEffect, useState } from 'react';
import { RootState } from '../../../GlobalRedux/store';
import CountryShape from '../../CountryShape';
import Skeleton from '../../Skeleton';
import { useSelector } from 'react-redux';
import { fetchGeoJSONData } from '../../../../utils/fetchGeo';
import clsx from 'clsx';

interface GeoJSONFile {
  name: string;
  path: string;
}

const ClassicGameContainer = ({ isActive, isDisabled }: { isActive: boolean; isDisabled: boolean }) => {
  const { country, score, hints, currStreak } = useSelector((state: RootState) => state.country);
  const [geoJsonPath, setGeoJsonPath] = useState<string | null>(null);

  if(currStreak >= 5){
    isActive = true;
    isDisabled = false;
  }else {
    isDisabled = true;
    isActive = false;
  }
  

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
    <div className="flex flex-col gap-4 md:gap-8 relative">
      <div className="flex flex-col md:flex-row gap-1 md:gap-8 w-full items-center justify-center fixed top-0 left-0 right-0 z-10">
        <div className={clsx('text-xl md:text-3xl flex flex-row gap-2 font-bold bg-clip-text text-transparent', isActive && 'bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500', isDisabled && 'text-white')}>
          Hints: <p className="text-black">{hints}</p>
        </div>
        
        <div className={clsx('text-2xl md:text-3xl flex flex-row gap-2 font-bold bg-clip-text text-transparent', isActive && 'bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500', isDisabled && 'text-white')}>
        Score: <p className="text-black">{score}</p>
        </div>
        <div className={clsx('text-xl md:text-3xl flex flex-row gap-2 font-bold bg-clip-text text-transparent', isActive && 'bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500', isDisabled && 'text-white')}>
        Streak: <p className="text-black">{currStreak}</p>
        </div>
    </div>
    <div className="flex flex-col h-72 w-full items-center justify-center">
      <div className="flex flex-row gap-4">
        <div className="flex-col flex">
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
    </div>
  );
};

export default ClassicGameContainer;