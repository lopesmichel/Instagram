import {api, requestConfig} from '../utils/config'

const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const response = await fetch(api + "/users/register", config);
    const resData = await response.json();

    if (!response.ok) {
      console.error("Erro do backend:", resData);
      return resData;
    }

    localStorage.setItem("user", JSON.stringify(resData));
    return resData;
  } catch (error) {
    console.error("Erro de rede:", error);
  }
};
  

const authService = {
    register
}

export default authService