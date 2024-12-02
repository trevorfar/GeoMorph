"use client"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { useEffect, useState } from "react";
import { lockIndex } from "../GlobalRedux/Features/wordSlice";

interface SkeletonProps {
  index: number;
  letter: string;
  onChange?: (value: string) => void;
  locked?: boolean;
}

const Skeleton = ({index, letter, onChange, locked}: SkeletonProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isRightClicked, setIsRightClicked] = useState(false);
  const dispatch = useDispatch();

  const handleSelect = () => {
    if (!locked) setIsSelected(!isSelected); 
  };
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsRightClicked(!isRightClicked); 
    dispatch(lockIndex(index));
  };


      
  
  return (
    <div
    onClick={handleSelect}
    onContextMenu={handleRightClick}
    className={`border-2 w-3 border-black h-3 lg:w-12 lg:h-12 md:w-8 flex items-center justify-center font-semibold p-2 
    transition duration-200 ease-in-out transform cursor-pointer 
    ${
        isRightClicked
          ? "border-red-500 bg-red-100" 
          : isSelected
          ? "scale-110 border-blue-500 bg-blue-100" 
          : "hover:scale-110 hover:border-blue-500" 
      }`}
  >
            {
              locked ? <>
              {letter.toUpperCase()}
              </>:
              <input
                type="text"
                maxLength={1}
                value={(letter || '').toUpperCase()}
                onChange={(e) => {
                  onChange && onChange(e.target.value)
                }
                }
                readOnly
                className="w-full h-full text-center bg-transparent outline-none cursor-pointer"
            />   
            } 
            </div>  
  );
};

export default Skeleton;
