import { forwardRef } from "react";

const FormSelect = forwardRef(function FormSelect(
  {
    label,
    name,
    options = [],
    required = false,
    error = "",
    id,
    placeholder = "Selecciona una opción",
    ...rest
  },
  ref
) {
  const selectName = name || rest.name;
  const selectId = id || selectName;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={selectId} className="font-semibold text-slate-700 dark:text-slate-200">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        id={selectId}
        name={selectName}
        required={required}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`border rounded-lg px-4 py-2 bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
            : "border-slate-300 focus:border-sky-400 focus:ring-sky-100 dark:border-slate-600 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
        }`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const isObject = typeof option === "object" && option !== null;
          const val = isObject ? option.value : option;
          const lbl = isObject ? option.label : option;

          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>

      {error && (
        <span id={errorId} className="text-sm text-red-500 font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

export default FormSelect;