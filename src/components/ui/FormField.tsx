/* eslint-disable @typescript-eslint/no-explicit-any */
export const FormField = ({
    label,
    id,
    type,
    options,
    ...rest
  }: {
    label: string;
    id: string;
    type: string;
    options?: { value: string; label: string }[];
    [key: string]: any;
  }) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        {type === "select" ? (
          <select
            id={id}
            name={id}
            className="border border-gray-300 rounded py-2 px-3 w-full"
            {...rest}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "checkbox" ? (
          <div className="flex items-center">
            <input
              id={id}
              name={id}
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded"
              {...rest}
            />
            <span className="ml-2 text-sm">{label}</span>
          </div>
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            className="border border-gray-300 rounded py-2 px-3 w-full outline-none"
            {...rest}
          />
        )}
      </div>
    );
  };