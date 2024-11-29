export async function promptSignin(): Promise<boolean> {
    const username = typeof window !== "undefined" ? localStorage.getItem("username") : "";
    if((!username)){
        return false
    }else {
        return true
    }
}