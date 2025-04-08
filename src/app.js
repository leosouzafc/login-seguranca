const API_URL = "http://localhost:8000";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  const messageDiv = document.getElementById("login-message");

  if (response.ok) {
    messageDiv.textContent = "Login bem-sucedido! Token: " + result.token;
    localStorage.setItem("token", result.token);
  } else {
    messageDiv.textContent = "Erro: " + result.detail;
  }
}

async function register() {
  const newUsername = document.getElementById("new-username").value;
  const newPassword = document.getElementById("new-password").value;

  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: newUsername, password: newPassword }),
  });

  const result = await response.json();
  const messageDiv = document.getElementById("register-message");

  if (response.ok) {
    messageDiv.textContent = "Usuário registrado com sucesso!";
  } else {
    messageDiv.textContent = "Erro: " + result.detail;
  }
}

async function getUserInfo() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token não encontrado no localStorage.");
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error("Erro ao obter informações do usuário:", error);
    return null;
  }
}

async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL}/users/`);
    if (!response.ok) {
      const message = await response.json();
      throw new Error("Erro ao obter usuários: " + message.detail);
    }
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    document.getElementById("users-list").innerText = error.message;
  }
}

// Função para exibir usuários na interface
function displayUsers(users) {
  const usersList = document.getElementById("users-list");
  usersList.innerHTML = ""; // Limpa a lista antes de adicionar novos usuários
  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.innerText = `Usuário: ${user.username}`; // Altere conforme a estrutura do objeto de usuário
    usersList.appendChild(userItem);
  });
}

// Função para obter informações do usuário logado
async function fetchMyInfo() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        "Erro ao obter informações do usuário: " + response.detail
      );
    }
    const myInfo = await response.json();
    displayMyInfo(myInfo);
  } catch (error) {
    document.getElementById("my-info-details").innerText = error.message;
  }
}

function displayMyInfo(myInfo) {
  const myInfoDetails = document.getElementById("my-info-details");
  myInfoDetails.innerHTML = "";
  const infoItem = document.createElement("div");
  infoItem.innerText = `Usuário: ${myInfo.username}, Número: ${myInfo.id}, Função: ${myInfo.role}`;

  myInfoDetails.appendChild(infoItem);
}
