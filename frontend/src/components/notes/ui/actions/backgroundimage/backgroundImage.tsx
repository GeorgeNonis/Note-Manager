import { BackgroundImageProps } from "./interfaces";
import { useBackgroundimage } from "./useBackgroundimage";
import styles from "./styles.module.scss";
import { Modal } from "../../../../Molecules";
import LoadingSpinner from "../../../../ui/loading-spinner";

const BackgroundImage = ({
  setDisplayPalette,
  id,
  pinned,
  archived,
  open,
}: BackgroundImageProps) => {
  const {
    images: mobileVersion,
    loading,
    displayHandler,
  } = useBackgroundimage({
    setDisplayPalette,
    id,
    pinned,
    archived,
  });

  return (
    <Modal
      onClose={() => setDisplayPalette((prev) => !prev)}
      open={open}
      title="Background Image"
    >
      {loading && <LoadingSpinner />}
      <div className={styles.backgroundImages}>
        <div
          className={styles.default}
          onClick={() => {
            displayHandler(`#202124`);
          }}
        >
          <h3>Default</h3>
        </div>
        {mobileVersion.map((bg) => {
          return (
            <img
              loading="lazy"
              style={{ pointerEvents: "all" }}
              src={bg.src}
              alt={bg.src}
              key={bg.src}
              onClick={() => {
                displayHandler(bg.src);
              }}
            />
          );
        })}
      </div>
    </Modal>
  );
};
export default BackgroundImage;
