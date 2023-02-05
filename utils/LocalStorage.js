export function getDistrict() {
    const data = window.localStorage.getItem("district");

    if(!data)
        return null;

    return JSON.parse(data);
}

export function setDistrict(data) {
    console.log(data);
    localStorage.setItem('bgcolor', 'red');
    window.localStorage.setItem("district", JSON.stringify(data));
}
