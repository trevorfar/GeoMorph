import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

interface SkeletonProps {
  index: number;
}

const Skeleton = ({ index }: SkeletonProps) => {
  const { country, currentWord } = useSelector((state: RootState) => state.country);
  const typedLetter = currentWord[index] || "";

  if (country[index] === " ") {
    return <div className="w-8 h-12 md:w-8 flex items-center justify-center">&nbsp;</div>;
  }

  if (country[index] === country[index].toUpperCase() && country[index] !== country[index].toLowerCase() && index !== 0) {
    return (
      <div className="border-b-2 border-slate-900 w-4 h-12 md:w-8 ml-4 flex items-center justify-center text-white">
        {typedLetter || ""}
      </div>
    );
  }

  return (
    <div className="border-b-2 border-slate-900 w-8 h-12 md:w-8 flex items-center justify-center text-white font-semibold">
      {typedLetter || ""}
    </div>
  );
};

export default Skeleton;
