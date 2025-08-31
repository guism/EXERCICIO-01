const userService = require('../service/userService');

const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }
  const result = userService.registerUser(username, password);
  if (result.error) {
    return res.status(409).json({ error: result.error });
  }
  res.status(201).json({ user: result.user });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const result = userService.loginUser(username, password);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ user: result.user });
};

const list = (req, res) => {
  res.json({ users: userService.listUsers() });
};

const remove = (req, res) => {
  const { username } = req.params;
  const result = userService.deleteUser(username);
  if (result.error) {
    return res.status(404).json({ error: result.error });
  }
  res.json({ success: true });
};

module.exports = {
  register,
  login,
  list,
  remove
};
