import { Suspense } from "react";
import { GrPersonalComputer } from "react-icons/gr";
import { URL_REGEX, cached_avatar_pictures } from "../../../config";
import { AvatarOptionsProps } from "./interfaces";
import { HiXMark } from "react-icons/hi2";
import styles from "./styles.module.scss";

const AvatarOptions = ({ closeModal, avatarHandler }: AvatarOptionsProps) => {
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => closeModal((prev) => !prev)}
      ></div>
      <div className={styles.modalContent}>
        <HiXMark
          className={styles.xMark}
          onClick={() => closeModal((prev) => !prev)}
        />
        <h1>Avatar Options</h1>
        <div className={styles.actions}>
          <div className={styles.fromcomputer}>
            <button>
              <GrPersonalComputer fill="black" stroke="gray" color="gray" />
            </button>
            <h3>From Computer</h3>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  avatarHandler(
                    URL_REGEX.test(URL.createObjectURL(e.target.files![0]))
                      ? URL.createObjectURL(e.target.files![0])
                      : e.target.files![0]
                  );
                }
              }}
              name="image"
              type="file"
              id="file"
              className={styles.input}
              accept="image/png, image/jpeg"
            />
          </div>
          <div className={styles.modalImages}>
            <Suspense fallback={"...loading avatars"}>
              {cached_avatar_pictures.map((avtr) => {
                return (
                  <img
                    src={avtr.src}
                    key={avtr.src}
                    onClick={() => {
                      console.log(URL_REGEX.test(avtr.src));
                      avatarHandler(avtr.src);
                    }}
                  />
                );
              })}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};
export default AvatarOptions;
