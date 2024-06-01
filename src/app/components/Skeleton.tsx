import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../GlobalRedux/store"

interface SkeletonProps {
  index: number
}

const Skeleton = ({index}: SkeletonProps) => {

  const { country, currentWord } = useSelector((state: RootState) => state.country)
 const typedLetter = currentWord[index] || ""
 if(Array.from(country)[index-1] === " "){
    return  <div className=" w-2 md:w-4 pt-4 flex justify-center"> </div>
 }
  return <div className="border-b-2 border-blue-500 w-6 md:w-8 pt-4 flex justify-center">{typedLetter||""}</div>
}

export default Skeleton
