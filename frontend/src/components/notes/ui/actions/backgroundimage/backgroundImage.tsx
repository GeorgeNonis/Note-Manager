// import { BackgroundImageProps } from "./interfaces";
// import { useBackgroundimage } from "./useBackgroundimage";
// import styles from "./styles.module.scss";

// const BackgroundImage = ({
//   setDisplayPalette,
//   id,
//   pinned,
// }: BackgroundImageProps) => {
//   const { mobileVersion, displayHandler } = useBackgroundimage({
//     setDisplayPalette,
//     id,
//     pinned,
//   });
//   return (
//     <>
//       <div
//         className={styles.backdrop}
//         onClick={(e) => setDisplayPalette((prev) => !prev)}
//       ></div>
//       <div className={styles.modalContent}>
//         <h3 className={styles.title}>Background Image</h3>
//         <div className={styles.backgroundImages}>
//           <div
//             className={styles.default}
//             onClick={() => {
//               console.log("clicking");
//               displayHandler(`#202124`);
//             }}
//           >
//             <h3>Default</h3>
//           </div>
//           {mobileVersion.map((bg) => {
//             return (
//               <img
//                 loading="lazy"
//                 style={{ pointerEvents: "all" }}
//                 src={bg}
//                 alt={bg}
//                 key={bg}
//                 onClick={() => {
//                   console.log("clicking");
//                   displayHandler(bg);
//                 }}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };
// export default BackgroundImage;
import { useEffect, useState, useRef } from "react";
import { BackgroundImageProps } from "./interfaces";
import { useBackgroundimage } from "./useBackgroundimage";
import styles from "./styles.module.scss";

const BackgroundImage = ({
  setDisplayPalette,
  id,
  pinned,
}: BackgroundImageProps) => {
  const backgroundimages = useRef<HTMLDivElement>(null);
  const [curr, setCurr] = useState(0);

  const { mobileVersion, displayHandler } = useBackgroundimage({
    setDisplayPalette,
    id,
    pinned,
  });

  const prev = () =>
    setCurr((curr) => (curr === 0 ? mobileVersion.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === mobileVersion.length - 1 ? 0 : curr + 1));

  console.log(curr);

  useEffect(() => {
    backgroundimages.current?.focus();
  }, []);

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={(e) => setDisplayPalette((prev) => !prev)}
      ></div>
      <div
        ref={backgroundimages}
        tabIndex={0}
        className={styles.modalContent}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            next();
          } else if (e.key == "ArrowLeft") {
            prev();
          }
        }}
      >
        <h3 className={styles.title}>Background Image</h3>
        <div className={styles.leftarrow} onClick={prev}></div>
        <div
          className={styles.backgroundImages}
          style={{ transform: `translateX(-${curr * 40}%)` }}
        >
          {/* <div
            className={styles.default}
            onClick={() => {
              console.log("clicking");
              displayHandler(`#202124`);
            }}
          >
            <h3>Default</h3>
          </div> */}
          {mobileVersion.map((bg, index) => {
            return (
              <img
                loading="lazy"
                src={bg}
                alt={bg}
                key={index}
                onClick={() => {
                  console.log("clicking");
                  displayHandler(bg);
                }}
              />
            );
          })}
        </div>
        <div className={styles.rightarrow} onClick={next}></div>
      </div>
    </>
  );
};
export default BackgroundImage;
