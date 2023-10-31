
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';

export const REGISTRY_USER = 'REGISTRY_USER';

function setCookie(name, value, props = {}) {
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
      updatedCookie += "; " + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
    document.cookie = updatedCookie;
  }

export const createUser = (dataUser) => {
    return (dispatch) => {
        fetch(BASE_URL+'/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser),
        })
            .then(checkReponse)
            .then(data => {
                dispatch({type:REGISTRY_USER, data:data});
                setCookie('accessToken', data.accessToken);
                setCookie('refreshToken', data.refreshToken);
            })
            .catch(error => {
                console.error(error);
            });
    }
};