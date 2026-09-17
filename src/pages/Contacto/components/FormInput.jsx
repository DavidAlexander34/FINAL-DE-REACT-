import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  {
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    error = "",
    id,
    ...rest
  },
  ref
) {
  // Garantiza que id y name estén alineados (útil si RHF inyecta name en rest)
  const inputName = name || rest.name;
  const inputId = id || inputName;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="font-semibold text-slate-700 dark:text-slate-200">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={inputName}
        type={type}
        placeholder={placeholder}
        required={required}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`border rounded-lg px-4 py-2 transition-colors focus:outline-none focus:ring-2 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
            : "border-slate-300 focus:border-sky-400 focus:ring-sky-100 dark:border-slate-600 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
        }`}
        {...rest}
      />

      {error && (
        <span id={errorId} className="text-sm text-red-500 font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

export default FormInput;