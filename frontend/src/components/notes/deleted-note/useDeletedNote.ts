import React, { useState } from "react";

export const useDeletedNote = () => {
  const [review, setReview] = useState<boolean>(false);
  const handleExpand = () => {
    setReview(!review);
  };

  return {
    review,
    handleExpand,
  };
};
