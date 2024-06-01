const API_URL = "https://api.example.com/auth"; // Reemplazar con la URL real de la API

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

  return data.token;
};

export default authenticate;