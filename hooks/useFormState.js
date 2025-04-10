import { useState } from "react";

function useFormState(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const reset = () => {
    setValues(initialValues);
  };

  return [values, onChange, reset];
}

export default useFormState;
