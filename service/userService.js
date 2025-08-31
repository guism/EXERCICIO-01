const { users } = require('../model/userModel');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function registerUser(username, password) {
  if (findUserByUsername(username)) {
    return { error: 'Usuário já existe.' };
  }
  const user = { username, password };
  users.push(user);
  return { user };
}

function loginUser(username, password) {
  if (!username || !password) {
    return { error: 'Login e senha são obrigatórios.' };
  }
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return { error: 'Usuário ou senha inválidos.' };
  }
  return { user };
}

function deleteUser(username) {
  const index = users.findIndex(u => u.username === username);
  if (index === -1) {
    return { error: 'Usuário não encontrado.' };
  }
  users.splice(index, 1);
  return { success: true };
}

function listUsers() {
  return users.map(u => ({ username: u.username }));
}

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  listUsers
};
