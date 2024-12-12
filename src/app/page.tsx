"use client"

import StyledButton from "@/utils/StyledComponents/Button"
import { useRouter } from "next/navigation";
import Rules from "./components/Rules";

const Page = () => {
    const router = useRouter()

    return (
    <>
    <Rules displayButton={true}/>
    </>
    )
}

export default Page