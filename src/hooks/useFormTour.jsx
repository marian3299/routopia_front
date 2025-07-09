import { useForm } from "react-hook-form";
import { createDestination } from "../services/destino.service";
import { useNotification } from "../context/useNotificationProvider";
import { useState } from "react";

const useFormTour = () => {
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      duration: "",
      description: "",
      language: "ENGLISH",
      location: "",
      category: "FRANCE",
      score: "",
      city: "",
    },
  });

  const { notify } = useNotification();

  const onSubmit = async (data) => {
    const dataToSend = new FormData();

    const formDataToSend = {
      name: data.name,
      price: parseFloat(data.price),
      duration: data.duration,
      description: data.description,
      language: data.language,
      location: data.location,
      category: data.category,
      score: parseFloat(data.score),
      city: data.city,
    };

    // Agregamos todos los campos del estado al objeto FormData
    Object.entries(formDataToSend).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        dataToSend.append(key, value);
      }
    });

    try {
      setSending(true);
      const result = await createDestination(dataToSend);
      console.log("Destino creado con éxito:", result);
      notify({
        message: "¡Destino guardado correctamente!",
        type: "success",
      });
      reset(); // Limpiar el formulario
    } catch (error) {
      console.error("Falló la creación del destino:", error);
      notify({
        message: "Hubo un error al guardar el destino.",
        type: "error",
      });
    } finally {
      setSending(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    sending,
  };
};

export default useFormTour;
