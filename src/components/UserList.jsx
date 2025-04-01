import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../services/auth.service';
import M from 'materialize-css';

const UserList = ({ onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      M.toast({ html: `Error fetching users: ${error}`, classes: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (uid) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este usuario?')) return;

    try {
      await deleteUser(uid);
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
      M.toast({ html: 'Usuario eliminado correctamente', classes: 'green' });
    } catch (error) {
      M.toast({ html: `Error deleting user: ${error}`, classes: 'red' });
    }
  };

  const handleEditClick = (userId) => {
    onEditUser(userId);
  };

  return (
    <div className="container">
      <h4 className="center">Lista de Usuarios</h4>
      {isLoading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn-small blue"
                    onClick={() => handleEditClick(user.uid)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-small red"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleDelete(user.uid)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

UserList.propTypes = {
  onEditUser: PropTypes.func.isRequired,
};

export default UserList;
