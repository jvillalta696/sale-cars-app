import React, { useState } from "react";
import UserList from "../components/UserList.jsx";
import UserForm from "../components/UserForm.jsx";

const ViewConfigure = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Configuración</span>
          {selectedUserId ? (
            <UserForm userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
          ) : (
            <UserList onEditUser={handleEditUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewConfigure;