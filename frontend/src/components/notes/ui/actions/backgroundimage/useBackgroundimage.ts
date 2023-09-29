import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNoteColorHttp } from "../../../../../services";
import {
  errorState,
  fetchingDataHandler,
} from "../../../../../store/display-state-slice";
import { setColor } from "../../../../../store/notes-slice";
import { isThereError } from "../../../../../utils/utils";
import { useBackgroundimageProps } from "./interfaces";
import { mobileVersion } from "../../../../../config";

export const useBackgroundimage = ({
  setDisplayPalette,
  id,
  pinned,
  archived,
}: useBackgroundimageProps) => {
  const token = sessionStorage.getItem("auth-token")!;
  const dispatch = useDispatch();

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  useEffect(() => {
    const preload_images = mobileVersion.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    setImages(preload_images);
  }, []);

  const displayHandler = async (value: string) => {
    dispatch(fetchingDataHandler());
    const response = await updateNoteColorHttp(
      value,
      id,
      pinned,
      archived,
      token
    );
    const sucessfullRequest = isThereError(response);
    sucessfullRequest && dispatch(setColor({ value, id, pinned, archived }));

    setDisplayPalette(false);
    dispatch(fetchingDataHandler());
  };

  return { displayHandler, images };
};
