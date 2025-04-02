import React, { useState } from "react";
import UserList from "../components/UserList.jsx";
import UserForm from "../components/UserForm.jsx";

const ViewConfigure = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [createUsr, setCreateUser] = useState(false);

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Configuración</span>
          {selectedUserId || createUsr ? (
            <UserForm
              userId={selectedUserId}
              onClose={() => {
                setSelectedUserId(null);
                setCreateUser(false);
              }}
            />
          ) : (
            <UserList
              onEditUser={(userId) => {
                setSelectedUserId(userId);
                setCreateUser(false);
              }}
              onCreateUser={() => setCreateUser(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewConfigure;