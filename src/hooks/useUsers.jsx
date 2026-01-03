import React, { useState, useEffect, useCallback } from "react";
import { useNotification } from "../context/useNotificationProvider";
import api from "../services/api";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tempPermissions, setTempPermissions] = useState([]); // Permisos temporales antes de guardar
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { notify } = useNotification();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      notify({ message: "Error al cargar usuarios", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.apellido?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  // Resetear permisos temporales cuando se selecciona un nuevo usuario
  useEffect(() => {
    if (selectedUser) {
      setTempPermissions(selectedUser.permissions || []);
    }
  }, [selectedUser]);

  // Actualizar permisos temporales (solo en estado local)
  const handleTogglePermission = (permission, checked) => {
    if (checked) {
      // Agregar permiso si no existe
      if (!tempPermissions.includes(permission)) {
        setTempPermissions([...tempPermissions, permission]);
      }
    } else {
      // Remover permiso
      setTempPermissions(tempPermissions.filter((p) => p !== permission));
    }
  };

  // Guardar todos los permisos al backend
  const handleSavePermissions = async () => {
    if (!selectedUser || selectedUser.role === "ADMIN") return;

    setSaving(true);
    try {
      // Enviar todos los permisos como un array usando PUT
      await api.put(`/users/${selectedUser.id}/permissions`, {
        permissions: tempPermissions,
      });

      notify({
        message: "Permisos guardados correctamente",
        type: "success",
      });

      // Actualizar el usuario en la lista con los nuevos permisos
      const updatedUsers = users.map((u) => {
        if (u.id === selectedUser.id) {
          return { ...u, permissions: tempPermissions };
        }
        return u;
      });
      setUsers(updatedUsers);

      // Actualizar el usuario seleccionado
      const updatedUser = updatedUsers.find((u) => u.id === selectedUser.id);
      setSelectedUser(updatedUser);
    } catch (err) {
      console.error("Error saving permissions:", err);
      notify({ message: "Error al guardar permisos", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // Verificar si el permiso está en los permisos temporales
  const userHasPermission = (permission) => {
    if (selectedUser?.role === "ADMIN") return true;
    return tempPermissions.includes(permission);
  };

  // Verificar si hay cambios sin guardar
  const hasUnsavedChanges = () => {
    if (!selectedUser || selectedUser.role === "ADMIN") return false;
    const originalPermissions = selectedUser.permissions || [];
    return (
      originalPermissions.length !== tempPermissions.length ||
      !originalPermissions.every((p) => tempPermissions.includes(p)) ||
      !tempPermissions.every((p) => originalPermissions.includes(p))
    );
  };

  const getSectionName = (section) => {
    const names = {
      DESTINOS: "Destinos",
      USERS: "Usuarios",
    };
    return names[section] || section;
  };
  return {
    users,
    filteredUsers,
    loading,
    selectedUser,
    saving,
    searchTerm,
    setSearchTerm,
    handleTogglePermission,
    handleSavePermissions,
    userHasPermission,
    hasUnsavedChanges,
    getSectionName,
    setSelectedUser,
  };
};

export default useUsers;
