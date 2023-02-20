import React, { useEffect, useRef } from "react";

export const useOutsideHover = (callback: () => void) => {
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

    document.addEventListener("mouseover", handleClick, true);

    return () => {
      document.removeEventListener("mouseover", handleClick, true);
    };
  }, []);

  return ref;
};
