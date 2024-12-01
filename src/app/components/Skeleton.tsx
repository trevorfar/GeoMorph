import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

interface SkeletonProps {
  index: number;
}

const Skeleton = () => {
  return (
    <div className="border-b-2 border-slate-900 w-8 h-12 md:w-8 flex items-center justify-center text-white font-semibold">
      {/* letter if desired */}
    </div>
  );
};

export default Skeleton;
