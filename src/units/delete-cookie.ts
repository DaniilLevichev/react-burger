import setCookie from "./set-cookie";

function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
} 

export default deleteCookie;

