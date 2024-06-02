import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

const GuessContainer = () => {
    const { country } = useSelector((state: RootState) => state.country);

  return (
    <div className="w-full h-16 bg-gray-400">
        {country}
      
    </div>
  )
}

export default GuessContainer
