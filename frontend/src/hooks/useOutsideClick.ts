import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect, useRef, SetStateAction } from "react";

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    /**
     *
     * couldnt figure out the type ...
     */
    const handleClick = (event: any) => {
      // console.log("HERE");
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return ref;
};
