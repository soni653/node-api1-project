let users = [
  { id: "1", name: "Dave", bio: "Good wife" }, // hint: use the shortid npm package to generate it
  { id: "2", name: "Jane Doe", bio: "Girl" }, // String, required
  { id: "3", name: "Carl", bio: "Not Tarzan's Wife, another Jane" }, // String, required
];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

function createUser(data) {
  const payload = {
    id: String(users.length + 1),
    ...data,
  };

  users.push(payload);
  return payload;
}

function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };

  return users[index];
}

function deleteUser(id) {
  users = users.filter((u) => u.id != id);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
