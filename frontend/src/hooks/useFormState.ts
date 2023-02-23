import { useState } from "react";

const useFormState = () => {
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return {
    loading,
    display,
    note,
    title,
    setLoading,
    setDisplay,
    setNote,
    setTitle,
  };
};
export default useFormState;
