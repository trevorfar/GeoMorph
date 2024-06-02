import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../GlobalRedux/store";
import { next } from "../GlobalRedux/Features/countrySlice"

const GuessContainer = () => {
    const { country } = useSelector((state: RootState) => state.country);
    const dispatch = useDispatch<AppDispatch>();

  return (
    
    <div className="w-full h-16 bg-gray-400">
        {country}
        <button className="bg-red-700 w-16 h-8 rounded-xl text-white " onClick={() => dispatch(next())}>Skip</button>

    </div>
  )
}

export default GuessContainer
