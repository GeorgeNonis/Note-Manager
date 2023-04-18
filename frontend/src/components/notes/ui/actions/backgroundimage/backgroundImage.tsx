import { BackgroundImageProps } from "./interfaces";
import { useBackgroundimage } from "./useBackgroundimage";
import styles from "./styles.module.scss";

const BackgroundImage = ({
  setDisplayPalette,
  id,
  pinned,
  archived,
}: BackgroundImageProps) => {
  const { mobileVersion, displayHandler } = useBackgroundimage({
    setDisplayPalette,
    id,
    pinned,
    archived,
  });
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={(e) => setDisplayPalette((prev) => !prev)}
      ></div>
      <div className={styles.modalContent}>
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
                src={bg}
                alt={bg}
                key={bg}
                onClick={() => {
                  console.log("clicking");
                  displayHandler(bg);
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
