import setCookie from "./set-cookie";

function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
} 

export default deleteCookie;

