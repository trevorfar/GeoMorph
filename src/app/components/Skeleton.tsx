import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../GlobalRedux/store"

interface SkeletonProps {
  index: number
}

const Skeleton = ({index}: SkeletonProps) => {

  const { currentWord } = useSelector((state: RootState) => state.country)
 const typedLetter = currentWord[index] || ""
  return <div className="border-b-2 border-blue-500 w-8 pt-4">{typedLetter||""}</div>
}

export default Skeleton
