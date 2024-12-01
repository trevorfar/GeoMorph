import Skeleton from "../Skeleton";

const InputWord = () => {
    const skeletons = Array(5).fill(null);

  return (
    <div className="border-2 border-green-700 flex flex-row items-center justify-center">
          {skeletons.map((_, idx) => (
                <Skeleton key={idx} index={idx} letter=""/>
                ))}
    </div>
  )
}

export default InputWord
