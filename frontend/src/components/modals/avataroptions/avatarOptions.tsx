import { Suspense } from "react";
import { GrPersonalComputer } from "react-icons/gr";
import { URL_REGEX, cached_avatar_pictures } from "../../../config";
import { AvatarModalProps } from "./interfaces";
import styles from "./styles.module.scss";
import { Modal } from "../../Molecules";
import { StyledComputer } from "./avatarOptions.styles";
import { Input } from "../../Atoms";

const AvatarModal = ({ closeModal, avatarHandler, open }: AvatarModalProps) => {
  navigator.userAgent;
  return (
    <Modal onClose={() => closeModal((prev) => !prev)} open={open}>
      <h1>Avatar Options</h1>
      <div className={styles.actions}>
        <StyledComputer>
          <button>
            <GrPersonalComputer
              fill="black"
              stroke="gray"
              color="gray"
              className={styles.svg}
            />
          </button>
          <h3>
            {/Android|iPhone/i.test(navigator.userAgent)
              ? "From Gallery"
              : "From Computer"}
          </h3>
          <Input
            css={{
              position: "absolute",
              cursor: "pointer",
              opacity: 0,
              top: 0,
              w: "100%",
              h: "100%",
            }}
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
            accept="image/png, image/jpeg"
          />
        </StyledComputer>
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
    </Modal>
  );
};
export default AvatarModal;
