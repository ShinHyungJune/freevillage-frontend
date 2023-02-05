export function getLocalUser() {
    const userStr = localStorage.getItem("user");

    if(!userStr)
        return null;

    return JSON.parse(userStr);
}

export function getLocalToken(){
    const token = localStorage.getItem("token");

    if(!token)
        return null;

    return JSON.parse(token);
}