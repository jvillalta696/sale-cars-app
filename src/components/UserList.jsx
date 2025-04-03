import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../services/auth.service';
import M from 'materialize-css';
import { useAuth } from '../context/AuthContext.jsx';

const UserList = ({ onEditUser, onCreateUser }) => {
  const [users, setUsers] = useState([]);
  const {user,config} = useAuth();
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
      <button
        className="btn green"
        style={{ marginBottom: '20px' }}
        onClick={() => onCreateUser(true)}
      >
        Crear Usuario
      </button>
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
            {users.map((usr) => (
              <tr key={usr.uid}>
                <td>{usr.displayName}</td>
                <td>{usr.email}</td>
                <td>
                  <button
                    disabled={user.uid === usr.uid}
                    className="btn-small blue"
                    onClick={() => handleEditClick(usr.uid)}
                  >
                    Editar
                  </button>
                  <button
                    disabled={user.uid === usr.uid}
                    className="btn-small red"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleDelete(usr.uid)}
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
  onCreateUser: PropTypes.func.isRequired,
};

export default UserList;
