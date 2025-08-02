import { useForm } from "react-hook-form";
import { createDestination } from "../services/destino.service";
import { useNotification } from "../context/useNotificationProvider";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const useFormTour = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      duration: "",
      description: "",
      languages: [],
      location: "",
      category: "FRANCE",
      score: "",
      city: "",
      image: null,
      image_list: null,
    },
  });

  const { notify } = useNotification();
  const [sending, setSending] = useState(false);

  const onSubmit = async (data) => {
    setSending(true);
    const dataToSend = new FormData();

    // Si languages es string (un solo valor), conviértelo a array
    const languagesArray = Array.isArray(data.languages)
      ? data.languages.map((lang) => lang.value)
      : [];

    const formDataToSend = {
      name: data.name,
      price: parseFloat(data.price),
      duration: data.duration,
      description: data.description,
      location: data.location,
      category: data.category,
      score: parseFloat(data.score),
      city: data.city,
    };

    // Agregamos todos los campos al objeto FormData
    Object.entries(formDataToSend).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        dataToSend.append(key, value);
      }
    });

    // Agregar los idiomas seleccionados
    languagesArray.forEach((lang) => dataToSend.append("languages", lang));

    // Agregar la imagen si existe
    if (data.image && data.image[0]) {
      dataToSend.append("image", data.image[0]);
    }

    // Agregar las imágenes adicionales si existen
    if (data.image_list && data.image_list.length > 0) {
      Array.from(data.image_list).forEach((image) => {
        dataToSend.append("image_list", image);
      });
    }

    try {
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

  const languages = [
    { value: "SPANISH", label: "Español" },
    { value: "ENGLISH", label: "Inglés" },
    { value: "FRENCH", label: "Francés" },
  ];

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    sending,
    languages,
    control,
    watch,
  };
};

export default useFormTour;
