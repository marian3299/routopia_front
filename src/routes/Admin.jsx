import React, { useState } from "react";
import useRecomendations from "../hooks/useRecomendations";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import ModalConfirm from "../components/ModalConfirm";
import { deleteDestination } from "../services/destino.service";
import { useNotification } from "../context/useNotificationProvider";
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../constants/permissions";

const Admin = () => {
  const {
    destinations,
    fetching_destinations,
    totalPages,
    currentPage,
    goToPage,
    goToFirstPage,
  } = useRecomendations({}, 10);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { hasPermission } = usePermissions();

  const [showModal, setShowModal] = useState(false);
  const [deleteDestinationId, setDeleteDestinationId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Verificar permisos
  if (!hasPermission(PERMISSIONS.DESTINOS.VIEW)) {
    return (
      <div className="admin-container">
        <p>No tienes permisos para ver esta sección.</p>
      </div>
    );
  }

  const handleDeleteDestination = async () => {
    if (!hasPermission(PERMISSIONS.DESTINOS.DELETE)) {
      notify({
        message: "No tienes permisos para eliminar destinos",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await deleteDestination(deleteDestinationId);
      setShowModal(false);
      notify({ message: "Destino eliminado correctamente", type: "success" });
      // Mantener la query actual y volver a la página 1 (página 0 en el código)
      await goToFirstPage();
    } catch (error) {
      console.error(error);
      setShowModal(false);
      notify({ message: "Error al eliminar el destino", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>Lista de destinos</h1>
      <div className="admin-table-container">
        {loading || fetching_destinations ? (
          <div className="loading">Cargando...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((destination) => (
                <tr key={destination.id}>
                  <td>{destination.id}</td>
                  <td>{destination.name}</td>
                  <td>
                    {hasPermission(PERMISSIONS.DESTINOS.EDIT) && (
                      <Button
                        text="Editar"
                        onClick={() => navigate(`/edit-tour/${destination.id}`)}
                      />
                    )}
                    {hasPermission(PERMISSIONS.DESTINOS.DELETE) && (
                      <Button
                        text="Eliminar"
                        onClick={() => {
                          setShowModal(true);
                          setDeleteDestinationId(destination.id);
                        }}
                      />
                    )}
                    {!hasPermission(PERMISSIONS.DESTINOS.EDIT) &&
                      !hasPermission(PERMISSIONS.DESTINOS.DELETE) && (
                        <span style={{ color: "#999" }}>
                          Sin acciones disponibles
                        </span>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        loading={fetching_destinations}
        previousLabel="← Anterior"
        nextLabel="Siguiente →"
      />
      {showModal && (
        <ModalConfirm
          title="Eliminar destino"
          message="¿Estás seguro de querer eliminar este destino?"
          onConfirm={handleDeleteDestination}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Admin;
