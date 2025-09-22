// src/models/useEnrollment.ts
import { useEffect, useState } from "react";
import { getEnrolled, setEnrolled } from "../../utils/enrollment";

export function useEnrollment(keyword: string) {
  const [enrolled, set] = useState(false);

  useEffect(() => {
    getEnrolled(keyword).then((v) => set(!!v));
  }, [keyword]);

  const toggleButton = () => {
    const next = !enrolled;
    set(next);
    setEnrolled(keyword, next);
  };

  return { enrolled, toggleButton };
}
