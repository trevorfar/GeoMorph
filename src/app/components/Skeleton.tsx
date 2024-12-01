import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

interface SkeletonProps {
  index: number;
  letter: string;
  onChange?: (value: string) => void;
  locked?: boolean;
}

const Skeleton = ({index, letter, onChange, locked}: SkeletonProps) => {
  return (
    <div className="border-2 border-slate-900 w-3 h-3 lg:w-12 lg:h-12 
    md:w-8 flex items-center justify-center font-semibold p-2">
            {
              locked ? <>
              {letter}
              </>:
              <input
                type="text"
                maxLength={1}
                value={letter || ''}
                onChange={(e) => onChange && onChange(e.target.value)}
                readOnly
                className="w-full h-full text-center bg-transparent outline-none cursor-pointer"
            />   } 
            </div>  
  );
};

export default Skeleton;
