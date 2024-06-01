import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../GlobalRedux/store";

const Skeleton = () => {
    const { currentWord } = useSelector((state: RootState) => state.country);

  return (
    <div className="border-b-2 border-blue-500 w-8">
      
    </div>
  )
}

export default Skeleton
