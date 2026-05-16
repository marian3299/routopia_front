import React, { useCallback, useEffect, useState } from "react";
import { useNotification } from "../context/useNotificationProvider";
import { useForm } from "react-hook-form";
import { createCategory, updateCategory } from "../services/category.service";

const useCategoriesForm = ({ selectedCategory }) => {
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
    if (selectedCategory) {
      setValue("name", selectedCategory?.name);
      setImagePreview(selectedCategory?.imageUrl);
      setValue("image", null);
      setValue("description", selectedCategory?.description);
    } else {
      setValue("name", "");
      setImagePreview(null);
      setValue("image", null);
      setValue("description", "");
    }
    const fileInput = document.getElementById("category-image");
    if (fileInput) fileInput.value = "";
  }, [selectedCategory, setValue]);

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
    dataToSend.append("description", data.description);
    const newImage = data.image?.length > 0 ? data.image[0] : null;
    if (newImage) {
      dataToSend.append("image", newImage);
    }
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, dataToSend);
        notify({
          message: "¡Categoría actualizada correctamente!",
          type: "success",
        });
      } else {
        await createCategory(dataToSend);
        notify({
          message: "¡Categoría guardada correctamente!",
          type: "success",
        });
        reset();
        setImagePreview(null);
        setValue("name", "");
        setValue("description", "");
        setValue("image", null);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setSending(false);
    }
  };

  const imageRegister = register("image", {
    validate: {
      required: (files) => {
        const hasNewFile = files && files.length > 0 && files[0];
        if (hasNewFile) return true;
        if (selectedCategory?.imageUrl && imagePreview) return true;
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

export default useCategoriesForm;
