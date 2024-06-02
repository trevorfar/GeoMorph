"use client"
import { RootState } from "../GlobalRedux/store"
import CountryShape from "./CountryShape"
import Skeleton from "./Skeleton"
import { useDispatch, useSelector } from "react-redux"

const GameContainer = () => {
  const { country, currentWord, index, score } = useSelector(
    (state: RootState) => state.country
  )
  const geoJsonPath = "/AFG.geo.json"

  return (
    <div className="flex flex-col h-96 w-full items-center justify-center">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <div className="">
            <CountryShape geoJsonPath={geoJsonPath} />
          </div>
        </div>
      </div>
      <div className="md:flex-row flex-wrap flex gap-4 md:gap-4 pt-12 ">
        {Array.from(country).map((_, idx) => (
          <Skeleton key={idx} index={idx} />
        ))}
      </div>
    </div>
  )
}
export default GameContainer
