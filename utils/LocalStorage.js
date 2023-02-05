export function getDistrict() {
  let data = null;

  if (process.client)
    data = localStorage.getItem("district");

  if (!data)
    return null;

  return JSON.parse(data);
}

export function setDistrict(data) {
  if (process.client)
    window.localStorage.setItem("district", JSON.stringify(data));
}
