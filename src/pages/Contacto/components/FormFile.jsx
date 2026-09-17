import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ACCEPT_POR_DEFECTO = { "application/pdf": [".pdf"] };

function FormFile({
  label,
  name,
  required = false,
  error = "",
  accept = ACCEPT_POR_DEFECTO,
  maxSizeMB = 2,
  maxFiles = 3,
  onFilesChange = () => {}, // Prop para sincronizar con React Hook Form
}) {
  const [archivos, setArchivos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  const generarId = (file) => `${file.name}-${file.lastModified}-${file.size}`;

  const limiteAlcanzado = archivos.length >= maxFiles;

  // Sincroniza los archivos con el formulario padre (React Hook Form / Controller)
  useEffect(() => {
    onFilesChange(archivos.map((a) => a.file));
  }, [archivos, onFilesChange]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    const espacioDisponible = maxFiles - archivos.length;

    if (espacioDisponible <= 0) {
      setErrorMsg(`Ya alcanzaste el máximo de ${maxFiles} archivos`);
      return;
    }

    if (acceptedFiles.length > 0) {
      const nuevosArchivos = acceptedFiles
        .slice(0, espacioDisponible)
        .map((file) => ({
          id: generarId(file),
          file,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
        }));

      setArchivos((anteriores) => [...anteriores, ...nuevosArchivos]);
      setErrorMsg("");
    }

    if (rejectedFiles.length > 0) {
      const primerError = rejectedFiles[0].errors[0];

      if (primerError.code === "file-too-large") {
        setErrorMsg(`El archivo supera el tamaño máximo de ${maxSizeMB}MB`);
      } else if (primerError.code === "file-invalid-type") {
        setErrorMsg("Tipo de archivo no permitido");
      } else if (primerError.code === "too-many-files") {
        setErrorMsg(`Solo puedes subir hasta ${maxFiles} archivos`);
      } else {
        setErrorMsg(primerError.message);
      }
    }
  };

  const eliminarArchivo = (id) => {
    setArchivos((anteriores) => {
      const archivoAEliminar = anteriores.find((arch) => arch.id === id);
      if (archivoAEliminar?.preview) {
        URL.revokeObjectURL(archivoAEliminar.preview);
      }
      return anteriores.filter((arch) => arch.id !== id);
    });
    setMensajeEliminado("Archivo eliminado");
  };

  useEffect(() => {
    if (!mensajeEliminado) return;
    const temporizador = setTimeout(() => setMensajeEliminado(""), 3000);
    return () => clearTimeout(temporizador);
  }, [mensajeEliminado]);

  useEffect(() => {
    return () => {
      archivos.forEach((arch) => {
        if (arch.preview) URL.revokeObjectURL(arch.preview);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles,
    disabled: limiteAlcanzado,
    maxSize: maxSizeMB * 1024 * 1024,
    accept,
  });

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-200">
        {label} {required && "*"}
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition dark:bg-slate-800/60 ${
          limiteAlcanzado
            ? "border-slate-200 bg-slate-50 cursor-not-allowed opacity-60 dark:border-slate-700 dark:bg-slate-800/40"
            : errorMsg || error
            ? "border-red-400 cursor-pointer"
            : "border-slate-300 hover:border-sky-400 cursor-pointer dark:border-slate-600 dark:hover:border-sky-500"
        }`}
      >
        <input
          {...getInputProps({
            id: name,
            name: name,
          })}
        />
        <div className="text-4xl mb-3">📎</div>
        {limiteAlcanzado ? (
          <p className="font-medium text-slate-500 dark:text-slate-300">
            Ya alcanzaste el máximo de {maxFiles} archivos
          </p>
        ) : isDragActive ? (
          <p className="font-medium text-sky-600">Suelta el archivo aquí...</p>
        ) : (
          <>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              Arrastra tus archivos aquí
            </p>
            <p className="text-sm text-slate-400 mt-1 dark:text-slate-400">
              o haz clic para seleccionarlos ({archivos.length}/{maxFiles})
            </p>
          </>
        )}
      </div>

      {mensajeEliminado && (
        <p className="text-sm text-emerald-600 font-medium">
          {mensajeEliminado}
        </p>
      )}

      {archivos.length > 0 && (
        <div className="flex flex-col gap-3 mt-2">
          {archivos.map(({ id, file, preview }) => (
            <div
              key={id}
              className="rounded-lg bg-slate-100 p-4 flex items-center justify-between gap-4 dark:bg-slate-700"
            >
              <div className="text-left">
                <p className="font-semibold text-slate-700 mb-1 dark:text-slate-100">
                  {file.name}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{file.type || "—"}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {preview && (
                  <img
                    src={preview}
                    alt={`Vista previa de ${file.name}`}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                  />
                )}
                <button
                  type="button"
                  onClick={() => eliminarArchivo(id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                  aria-label={`Eliminar ${file.name}`}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(errorMsg || error) && (
        <span className="text-sm text-red-500">{errorMsg || error}</span>
      )}
    </div>
  );
}

export default FormFile;