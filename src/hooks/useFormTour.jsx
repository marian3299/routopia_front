import { useState } from "react";
import { createDestination } from "../services/destino.service";

const useFormTour = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    language: "ENGLISH", // Valor inicial por defecto
    location: "",
    category: "FRANCE", // Valor inicial por defecto
    image: null,
    score: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    const formDataToSend = {
      name: formData.name,
      price: parseFloat(formData.price),
      duration: formData.duration,
      description: formData.description,
      language: formData.language,
      location: formData.location,
      category: formData.category,
      image: formData.image,
      score: parseFloat(formData.score),
      city: formData.city,
    };

    // Agregamos todos los campos del estado al objeto FormData
    Object.entries(formDataToSend).forEach(([key, value]) => {
      if (value !== null) {
        dataToSend.append(key, value);
      }
    });

    try {
      const result = await createDestination(dataToSend);
      console.log("Destino creado con éxito:", result);
      alert("¡Destino guardado correctamente!");
      // Aquí podrías redirigir al usuario o limpiar el formulario
    } catch (error) {
      console.error("Falló la creación del destino:", error);
      alert("Hubo un error al guardar el destino.");
      // Aquí podrías mostrar un mensaje de error más específico al usuario
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useFormTour;
