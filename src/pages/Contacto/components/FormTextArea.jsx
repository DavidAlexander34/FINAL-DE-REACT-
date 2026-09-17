import { forwardRef } from "react";

const FormTextArea = forwardRef(function FormTextArea(
  {
    label,
    name,
    required = false,
    placeholder = "",
    error = "",
    rows = 4,
    id,
    ...rest
  },
  ref
) {
  const textAreaName = name || rest.name;
  const textAreaId = id || textAreaName;
  const errorId = error ? `${textAreaId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={textAreaId} className="font-semibold text-slate-700 dark:text-slate-200">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={textAreaId}
        name={textAreaName}
        placeholder={placeholder}
        required={required}
        rows={rows}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`w-full border rounded-xl px-4 py-3 bg-slate-50 text-slate-700 placeholder:text-slate-400 shadow-sm transition-all duration-200 resize-y focus:outline-none focus:bg-white dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : "border-slate-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-600 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
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

export default FormTextArea;