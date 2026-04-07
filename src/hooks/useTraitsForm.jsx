import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTrait, updateTrait } from "../services/traits.service";
import { useNotification } from "../context/useNotificationProvider";

const useTraitsForm = ({ selectedTrait }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sending, setSending] = useState(false);
  const { notify } = useNotification();
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
      image: null,
    },
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (selectedTrait) {
      setValue("name", selectedTrait?.name);
      setImagePreview(selectedTrait?.imageUrl);
      setValue("image", null);
    } else {
      setValue("name", "");
      setImagePreview(null);
      setValue("image", null);
    }
    const fileInput = document.getElementById("trait-image");
    if (fileInput) fileInput.value = "";
  }, [selectedTrait, setValue]);

  // Manejar la selección de archivo
  const handleFileSelect = useCallback(
    (file) => {
      if (file && file.type.startsWith("image/")) {
        // Crear un FileList simulado para react-hook-form
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const fileList = dataTransfer.files;

        setValue("image", fileList, { shouldValidate: true });

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue],
  );

  // Manejar drag over
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  // Manejar drag leave
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  // Manejar drop
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect],
  );

  // Manejar click en el input - se ejecuta después del register
  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      // El setValue ya se maneja con register, solo actualizamos el preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Eliminar imagen
  const handleRemoveImage = useCallback(() => {
    setValue("image", null);
    setImagePreview(null);
    // Resetear el input file
    const fileInput = document.getElementById("trait-image");
    if (fileInput) {
      fileInput.value = "";
    }
  }, [setValue]);

  // Vista previa solo cuando el usuario elige un archivo nuevo (no pisar la imagen del servidor)
  React.useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    setSending(true);
    const dataToSend = new FormData();
    dataToSend.append("name", data.name);
    const newImage = data.image?.length > 0 ? data.image[0] : null;
    if (newImage) {
      dataToSend.append("image", newImage);
    }
    try {
      if (selectedTrait) {
        await updateTrait(selectedTrait.id, dataToSend);
        notify({
          message: "¡Característica actualizada correctamente!",
          type: "success",
        });
      } else {
        await createTrait(dataToSend);
        notify({
          message: "¡Característica guardada correctamente!",
          type: "success",
        });
        reset();
        setImagePreview(null);
        setValue("name", "");
        setValue("image", null);
      }
    } catch (error) {
      console.error("Error creating trait:", error);
    } finally {
      setSending(false);
    }
  };

  const imageRegister = register("image", {
    validate: {
      required: (files) => {
        const hasNewFile = files && files.length > 0 && files[0];
        if (hasNewFile) return true;
        if (selectedTrait?.imageUrl && imagePreview) return true;
        return "La imagen es requerida";
      },
      fileSize: (files) => {
        if (files && files[0]) {
          const fileSize = files[0].size / 1024 / 1024;
          return fileSize <= 5 || "La imagen debe ser menor a 5MB";
        }
        return true;
      },
      fileType: (files) => {
        if (files && files[0]) {
          const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ];
          return (
            validTypes.includes(files[0].type) ||
            "Solo se permiten archivos JPG, PNG o WEBP"
          );
        }
        return true;
      },
    },
  });

  return {
    register,
    imageRegister,
    handleSubmit,
    errors,
    onSubmit,
    reset,
    control,
    watch,
    setValue,
    imagePreview,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    handleRemoveImage,
    sending,
  };
};

export default useTraitsForm;
