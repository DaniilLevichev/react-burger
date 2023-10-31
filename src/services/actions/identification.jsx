import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';

export const CHECK_USER = 'CHECK_USER';

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

export const checkUser = (accessToken, refreshToken) => {
    console.log(accessToken);
    console.log(refreshToken);
    return (dispatch) => {
        fetch(BASE_URL+'/auth/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization' : accessToken
            }
        })
            .then(checkReponse)
            .then(data => {
                if(data.success){
                    dispatch({type:CHECK_USER, data:data.user});
                }
            })
            .catch(error => {
                if (error.message === 'jwt expired'){
                    fetch(BASE_URL+'/auth/token', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"token": refreshToken}),
                    })
                        .then(checkReponse)
                        .then(data => {
                            if (data.success){
                                setCookie('accessToken', data.accessToken);
                                setCookie('refreshToken', data.refreshToken);
                            }
                        })
                        .catch(error=> {
                            console.error(error);
                        })
                } else console.error(error);
            });
    }
};