"use client"
import CountryShape from "../components/CountryShape"
import GeoJSONSelector from "./GeoJson"

const page = () => {
    const geoJsonPath = "/AFG.geo.json"

  return (
    <div className="">
        <GeoJSONSelector />
     </div>
  )
}

export default page
