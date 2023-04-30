import { Suspense } from "react";
import { GrPersonalComputer } from "react-icons/gr";
import { cached_avatar_pictures } from "../../../config";
import { AvatarOptionsProps } from "./interfaces";
import styles from "./styles.module.scss";

const AvatarOptions = ({ closeModal, avatarHandler }: AvatarOptionsProps) => {
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => closeModal((prev) => !prev)}
      ></div>
      <div className={styles.modalContent}>
        <h1>Avatar Options</h1>
        <div className={styles.actions}>
          <div className={styles.fromcomputer}>
            <button>
              <GrPersonalComputer fill="black" stroke="gray" color="gray" />
            </button>
            <h3>From Computer</h3>
            <input
              onChange={(e) => {
                console.log(e.target.files![0]);
                console.log(e.target.files);
                console.log(URL.createObjectURL(e.target.files![0]));
                console.log(typeof URL.createObjectURL(e.target.files![0]));
                avatarHandler(URL.createObjectURL(e.target.files![0]));
              }}
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
