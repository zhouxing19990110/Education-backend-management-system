// 检查是否有token
export function authLogin(){
    let token = sessionStorage.getItem("token")
    return token?true:false
}