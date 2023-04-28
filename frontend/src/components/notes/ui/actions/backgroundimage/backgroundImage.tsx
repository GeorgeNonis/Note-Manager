import { BackgroundImageProps } from "./interfaces";
import { useBackgroundimage } from "./useBackgroundimage";
import styles from "./styles.module.scss";

const BackgroundImage = ({
  setDisplayPalette,
  id,
  pinned,
  archived,
  transitionState,
}: BackgroundImageProps) => {
  const { images: mobileVersion, displayHandler } = useBackgroundimage({
    setDisplayPalette,
    id,
    pinned,
    archived,
    transitionState,
  });

  const cssClasses = [
    styles.modalContent,
    transitionState === "entering"
      ? styles.openModal
      : transitionState === "exiting"
      ? styles.closeModal
      : null,
  ];

  console.log(transitionState);

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={(e) => setDisplayPalette((prev) => !prev)}
      ></div>
      <div className={cssClasses.join(" ")}>
        <h3 className={styles.title}>Background Image</h3>
        <div className={styles.backgroundImages}>
          <div
            className={styles.default}
            onClick={() => {
              console.log("clicking");
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
                  console.log("clicking");
                  displayHandler(bg.src);
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default BackgroundImage;
