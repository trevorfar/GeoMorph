export function promptSignin(): boolean {
    const username = localStorage.getItem("username");
    const topScore = localStorage.getItem("topScore");
    if((username || topScore) === ""){
        return false
    }else {
        return true
    }
}