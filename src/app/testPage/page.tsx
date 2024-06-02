"use client"
import CountryShape from "../components/CountryShape"

const page = () => {
    const geoJsonPath = "/AFG.geo.json"

  return (
    <div className="">
        <CountryShape geoJsonPath={geoJsonPath} />

    </div>
  )
}

export default page
