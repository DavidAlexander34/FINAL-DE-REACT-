import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import FormFile from "./components/FormFile";

import paises from "./paises";
import ciudades from "./ciudades";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_REGEX = /^[0-9]{10}$/;

function ContactoForm() {
  // Estado para indicar si se está enviando el formulario
  const [enviando, setEnviando] = useState(false);
  // Estado para forzar la reinicialización de FormFile solo al enviar con éxito
  const [resetKey, setResetKey] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      genero: "",
      pais: "",
      ciudad: "",
      correo: "",
      telefono: "",
      mensaje: "",
      archivo: [],
    },
  });

  const onSubmit = async (data) => {
    setEnviando(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "archivo" && Array.isArray(value)) {
        value.forEach((file) => formData.append("archivo", file));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        console.log("Datos del formulario:", data);

        await Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Tu mensaje fue enviado correctamente",
          confirmButtonColor: "#0ea5e9",
        });

        // Limpiar formulario y reiniciar input de archivos
        reset();
        setResetKey((prev) => prev + 1);
      } else {
        // Formspree responde con { errors: [{ message: "..." }, ...] } si algo falla
        const resultado = await response.json();
        const mensajeError = resultado.errors
          ? resultado.errors.map((e) => e.message).join(", ")
          : "Ocurrió un error al enviar el formulario";

        Swal.fire({
          icon: "error",
          title: "No se pudo enviar",
          text: mensajeError,
          confirmButtonColor: "#0ea5e9",
        });
      }
    } catch (error) {
      console.error("Error de red al enviar el formulario:", error);

      Swal.fire({
        icon: "error",
        title: "No se pudo enviar",
        text: "Revisa tu conexión a internet e intenta de nuevo.",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setEnviando(false);
    }
  };

  const estaCargando = isSubmitting || enviando;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto transition-colors dark:bg-slate-900 dark:shadow-slate-950/30"
      noValidate
    >
      {/* Datos personales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primer nombre */}
        <FormInput
          label="Primer Nombre"
          placeholder="Escribe tu primer nombre"
          required
          error={errors.primerNombre?.message}
          {...register("primerNombre", {
            required: "El primer nombre es obligatorio",
          })}
        />

        {/* Segundo nombre */}
        <FormInput
          label="Segundo Nombre"
          placeholder="Escribe tu segundo nombre"
          error={errors.segundoNombre?.message}
          {...register("segundoNombre")}
        />

        {/* Primer apellido */}
        <FormInput
          label="Primer Apellido"
          placeholder="Escribe tu primer apellido"
          required
          error={errors.primerApellido?.message}
          {...register("primerApellido", {
            required: "El primer apellido es obligatorio",
          })}
        />

        {/* Segundo apellido */}
        <FormInput
          label="Segundo Apellido"
          placeholder="Escribe tu segundo apellido"
          error={errors.segundoApellido?.message}
          {...register("segundoApellido")}
        />

        {/* Género */}
        <FormSelect
          label="Género"
          required
          options={["Femenino", "Masculino", "Otro"]}
          error={errors.genero?.message}
          {...register("genero", {
            required: "El género es obligatorio",
          })}
        />

        {/* País */}
        <FormSelect
          label="País"
          options={paises}
          required
          error={errors.pais?.message}
          {...register("pais", {
            required: "El país es obligatorio",
          })}
        />

        {/* Ciudad */}
        <FormSelect
          label="Ciudad"
          options={ciudades}
          required
          error={errors.ciudad?.message}
          {...register("ciudad", {
            required: "La ciudad es obligatoria",
          })}
        />

        {/* Correo */}
        <FormInput
          label="Correo Electrónico"
          type="email"
          placeholder="ejemplo@correo.com"
          required
          error={errors.correo?.message}
          {...register("correo", {
            required: "El correo es obligatorio",
            pattern: {
              value: EMAIL_REGEX,
              message: "Ingrese un correo válido",
            },
          })}
        />

        {/* Teléfono */}
        <FormInput
          label="Teléfono"
          type="tel"
          placeholder="3000000000"
          required
          error={errors.telefono?.message}
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            pattern: {
              value: TELEFONO_REGEX,
              message: "El teléfono debe contener 10 dígitos numéricos",
            },
          })}
        />
      </div>

      {/* Mensaje */}
      <div className="mt-6">
        <FormTextArea
          label="Mensaje"
          placeholder="Escribe tu mensaje aquí..."
          required
          rows={5}
          error={errors.mensaje?.message}
          {...register("mensaje", {
            required: "El mensaje es obligatorio",
            minLength: {
              value: 10,
              message: "El mensaje debe tener al menos 10 caracteres",
            },
          })}
        />
      </div>

      {/* Archivos */}
      <div className="mt-6">
        <Controller
          name="archivo"
          control={control}
          rules={{
            validate: (files) =>
              !files ||
              files.length <= 3 ||
              "Máximo 3 archivos permitidos",
          }}
          render={({ field }) => (
            <FormFile
              key={resetKey}
              label="Adjuntar archivos (máx. 3)"
              name="archivo"
              value={field.value}
              maxFiles={3}
              accept={{
                "application/pdf": [".pdf"],
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
              }}
              onFilesChange={field.onChange}
              error={errors.archivo?.message}
            />
          )}
        />
      </div>

      {/* Botón */}
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={estaCargando}
          className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {estaCargando ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Enviando...
            </>
          ) : (
            "Enviar mensaje"
          )}
        </button>
      </div>
    </form>
  );
}

export default ContactoForm;