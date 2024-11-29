export function promptSignin(): boolean {
    const username = typeof window !== "undefined" ? localStorage.getItem("username") : "";
    const topScore = typeof window !== "undefined" ? localStorage.getItem("topScore") : 0;
    if((username || topScore) === ""){
        return false
    }else {
        return true
    }
}