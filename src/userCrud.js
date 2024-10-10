import React, { useState, useEffect } from 'react';

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const addUser = () => {
    const newUser = { name };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    setName('');
  };

  const editUser = (index) => {
    setName(users[index].name);
    setEditingIndex(index);
  };

  const updateUser = () => {
    const updatedUsers = [...users];
    updatedUsers[editingIndex] = { name };
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    setName('');
    setEditingIndex(null);
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  return (
    <div>
      <h1>CRUD de Usuarios</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del usuario"
      />
      <button onClick={editingIndex !== null ? updateUser : addUser}>
        {editingIndex !== null ? 'Actualizar' : 'Agregar'}
      </button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name}
            <button onClick={() => editUser(index)}>Editar</button>
            <button onClick={() => deleteUser(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCrud;