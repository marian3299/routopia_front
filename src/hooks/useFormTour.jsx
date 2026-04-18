import { useForm } from "react-hook-form";
import {
  createDestination,
  updateDestination,
  getDestinationById,
} from "../services/destino.service";
import { useNotification } from "../context/useNotificationProvider";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { getTraits } from "../services/traits.service";

const useFormTour = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      duration: "",
      description: "",
      languages: [],
      traits: [],
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
  const [loading, setLoading] = useState(isEditMode);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [currentSecondaryImages, setCurrentSecondaryImages] = useState([]);
  const [traits, setTraits] = useState([]);

  const languages = useMemo(
    () => [
      { value: "SPANISH", label: "Español" },
      { value: "ENGLISH", label: "Inglés" },
      { value: "FRENCH", label: "Francés" },
    ],
    [],
  );

  const fetchTraits = useCallback(async () => {
    try {
      const res = await getTraits();
      setTraits(
        res.content.map((trait) => ({
          value: trait.id,
          label: trait.name,
        })),
      );
    } catch (err) {
      console.error("Error fetching traits:", err);
      notify({ message: "Error al cargar características", type: "error" });
    }
  }, [notify]);

  useEffect(() => {
    fetchTraits();
  }, [fetchTraits]);

  // Cargar datos del destino cuando esté en modo edición
  useEffect(() => {
    if (isEditMode && id) {
      const loadDestination = async () => {
        try {
          setLoading(true);
          const destination = await getDestinationById(id);

          // Guardar las URLs de las imágenes actuales
          setCurrentImageUrl(destination.imageUrl || "");
          setCurrentSecondaryImages(destination.secondaryImages || []);

          // Mapear los datos del destino al formulario
          setValue("name", destination.name || "");
          setValue("price", destination.precio || "");
          setValue("duration", destination.duration_time || "");
          setValue("description", destination.description || "");
          setValue("location", destination.location || "");
          setValue("category", destination.category || "FRANCE");
          setValue("score", destination.punctuation || "");
          setValue("city", destination.city || "");

          // Mapear idiomas
          if (destination.languages && Array.isArray(destination.languages)) {
            const mappedLanguages = destination.languages.map(
              (lang) =>
                languages.find((l) => l.value === lang) || {
                  value: lang,
                  label: lang,
                },
            );
            setValue("languages", mappedLanguages);
          }

          if (destination.traits && Array.isArray(destination.traits)) {
            setValue(
              "traits",
              destination.traits.map((t) => ({
                value: t.id,
                label: t.name,
              })),
            );
          }
        } catch (error) {
          console.error("Error loading destination:", error);
          notify({
            message: "Error al cargar los datos del destino",
            type: "error",
          });
        } finally {
          setLoading(false);
        }
      };

      loadDestination();
    }
  }, [id, isEditMode, setValue, notify, languages]);

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

    // Traits: mismo patrón que languages — varias entradas "traits" con el ID (backend List<Long>)
    const traitsSelection = Array.isArray(data.traits) ? data.traits : [];
    traitsSelection.forEach((item) => {
      const id = item?.value ?? item;
      if (id !== undefined && id !== null && id !== "") {
        dataToSend.append("traits", String(id));
      }
    });

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
      if (isEditMode) {
        await updateDestination(id, dataToSend);
        notify({
          message: "¡Destino actualizado correctamente!",
          type: "success",
        });
      } else {
        await createDestination(dataToSend);
        notify({
          message: "¡Destino guardado correctamente!",
          type: "success",
        });
        reset(); // Limpiar el formulario solo en modo creación
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notify({
          message: error.response.data.message,
          type: "error",
        });
      } else {
        notify({
          message: isEditMode
            ? "Hubo un error al actualizar el destino."
            : "Hubo un error al guardar el destino.",
          type: "error",
        });
      }
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
    loading,
    isEditMode,
    languages,
    control,
    watch,
    currentImageUrl,
    currentSecondaryImages,
    traits,
  };
};

export default useFormTour;
