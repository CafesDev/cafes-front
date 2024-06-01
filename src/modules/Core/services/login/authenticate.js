import { TOKEN_KEY, BACKEND_URL } from "../../../../constants";

const API_URL = `${BACKEND_URL}/api/authenticate`;

const authenticate = async (username, password) => {
  const body = JSON.stringify({ username, password });

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Error de autenticación: ${response.status}`);
  }

  const data = await response.json();
  console.log(data)

  sessionStorage.setItem(TOKEN_KEY, data.token)
  sessionStorage.setItem('username', data.user.nombres);
  return data;
};

export default authenticate;