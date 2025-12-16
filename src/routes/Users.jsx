import { PERMISSIONS } from "../constants/permissions";
import { usePermissions } from "../hooks/usePermissions";
import useUsers from "../hooks/useUsers";

const Users = () => {
  const { hasPermission } = usePermissions();
  const {
    filteredUsers,
    loading,
    selectedUser,
    setSelectedUser,
    saving,
    searchTerm,
    setSearchTerm,
    handleTogglePermission,
    handleSavePermissions,
    userHasPermission,
    hasUnsavedChanges,
    getSectionName,
  } = useUsers();

  // Solo mostrar si tiene permiso para gestionar usuarios
  if (!hasPermission(PERMISSIONS.USERS.MANAGE)) {
    return (
      <div className="admin-container">
        <p>No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      {/* Columna izquierda: Lista de usuarios */}
      <div className="users-list-container">
        <div className="users-list-header">
          <h2>Lista de usuarios</h2>
        </div>
        <div className="users-search-container">
          <input
            type="text"
            placeholder="Buscar usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="users-search-input"
          />
        </div>
        <div className="users-list">
          {loading ? (
            <div className="loading">Cargando...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="no-users">No se encontraron usuarios</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`user-item ${
                  selectedUser?.id === user.id ? "active" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="user-item-content">
                  <span className="user-email">{user.email}</span>
                  {user.role === "ADMIN" && (
                    <span className="user-role-badge">ADMIN</span>
                  )}
                </div>
                <div
                  className={`user-status-dot ${
                    user.role === "ADMIN" ? "admin" : "active"
                  }`}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Columna derecha: Panel de permisos */}
      <div className="users-permissions-container">
        {selectedUser ? (
          <div className="permissions-card">
            <div className="permissions-header">
              <h2>Permisos de usuario</h2>
              <div className="selected-user-info">
                <p className="user-name">
                  {selectedUser.nombre} {selectedUser.apellido}
                </p>
                <p className="user-email">{selectedUser.email}</p>
                {selectedUser.role === "ADMIN" && (
                  <span className="admin-badge">Administrador</span>
                )}
              </div>
            </div>

            {selectedUser.role === "ADMIN" ? (
              <div className="admin-message">
                <p>
                  Los administradores tienen todos los permisos habilitados.
                </p>
              </div>
            ) : (
              <div className="permissions-content">
                <div className="permissions-table">
                  <div className="permissions-table-header">
                    <div className="permission-action-col">Vista</div>
                    <div className="permission-action-col">Ver</div>
                    <div className="permission-action-col">Crear</div>
                    <div className="permission-action-col">Editar</div>
                    <div className="permission-action-col">Eliminar</div>
                  </div>

                  {Object.entries(PERMISSIONS).map(([section, actions]) => (
                    <div key={section} className="permissions-table-row">
                      <div className="permission-action-col">
                        {getSectionName(section)}
                      </div>
                      <div className="permission-action-col">
                        <Switch
                          checked={userHasPermission(actions.VIEW)}
                          onChange={(checked) =>
                            handleTogglePermission(actions.VIEW, checked)
                          }
                          disabled={selectedUser.role === "ADMIN"}
                        />
                      </div>
                      <div className="permission-action-col">
                        {actions.CREATE && (
                          <Switch
                            checked={userHasPermission(actions.CREATE)}
                            onChange={(checked) =>
                              handleTogglePermission(actions.CREATE, checked)
                            }
                            disabled={selectedUser.role === "ADMIN"}
                          />
                        )}
                      </div>
                      <div className="permission-action-col">
                        {actions.EDIT && (
                          <Switch
                            checked={userHasPermission(actions.EDIT)}
                            onChange={(checked) =>
                              handleTogglePermission(actions.EDIT, checked)
                            }
                            disabled={selectedUser.role === "ADMIN"}
                          />
                        )}
                      </div>
                      <div className="permission-action-col">
                        {actions.DELETE && (
                          <Switch
                            checked={userHasPermission(actions.DELETE)}
                            onChange={(checked) =>
                              handleTogglePermission(actions.DELETE, checked)
                            }
                            disabled={selectedUser.role === "ADMIN"}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="permissions-save-container">
                  <button
                    className="permissions-save-button"
                    onClick={handleSavePermissions}
                    disabled={
                      !hasUnsavedChanges() ||
                      saving ||
                      selectedUser?.role === "ADMIN"
                    }
                  >
                    {saving ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="no-selection">
            <p>Selecciona un usuario para ver y gestionar sus permisos</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente Switch (Toggle)
const Switch = ({ checked, onChange, disabled = false }) => {
  return (
    <label className={`switch ${disabled ? "disabled" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="slider"></span>
    </label>
  );
};

export default Users;
