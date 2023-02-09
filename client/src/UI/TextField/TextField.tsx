import React from "react";
interface ITeaxfield {
  fieldName?: string;
  fieldType: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string | null;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder?: string;
  className?: string;
}
const TextField = ({
  fieldName,
  fieldType,
  value,
  setValue,
  error,
  setError,
  placeholder,
  className,
}: ITeaxfield) => {
  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setError) {
      setError(null);
    }
    if (
      fieldName === "Phone" &&
      isNaN(Number(e.target.value)) &&
      e.target.value !== "+"
    ) {
      return;
    }
    setValue(e.target.value);
  };
  return (
    <div className="basis-2/5">
      {fieldName && (
        <p className="mb-1 ml-2 mt-2">
          {fieldName} <span className="text-[red]">*</span>
        </p>
      )}
      <input
        value={value}
        type={fieldType}
        onChange={changeValueHandler}
        maxLength={26}
        placeholder={placeholder}
        className={
          error
            ? `${className} border-[red] border-[2px] p-2 rounded-2xl outline-none`
            : `${className} p-2 rounded-2xl outline-none`
        }
      />
      {error && <h1 className="text-center text-[red] ">{error}</h1>}
    </div>
  );
};

export default TextField;
