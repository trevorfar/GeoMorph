import Counter from "./components/counter"
import OtherCounter from "./components/otherCounter"


const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Counter />
      <OtherCounter />
    </div>
  )
}
export default Page 
