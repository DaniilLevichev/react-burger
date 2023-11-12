import { checkResponse } from './check-response';
 
export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkReponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken();
        if (!refreshData.success) {
          Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        setCookie("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkReponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };  
  