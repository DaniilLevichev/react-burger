type TSetCookie = {
  expires?: any;
  path?: string;
}

function setCookie(name: string, value: any, props: TSetCookie = {}) {
    props = {
      path: "/",
      ...props,
    };
    let exp = props.expires;
    if (typeof exp == "number" && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + "=" + value;
    for (const propName in props) {
      if (Object.prototype.hasOwnProperty.call(props, propName)) {
          updatedCookie += "; " + propName;
          const propValue = props[propName as keyof TSetCookie];
          if (propValue !== true) {
              updatedCookie += "=" + propValue;
          }
      }
  }
  
    document.cookie = updatedCookie;
}

export default setCookie;