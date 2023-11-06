import { BackgroundImageProps } from "./interfaces";
import { useBackgroundimage } from "./useBackgroundimage";
import { Modal } from "../../../../Molecules";
import LoadingSpinner from "../../../../ui/loading-spinner";
import {
  StyledContainer,
  StyledDefault,
  StyledImg,
} from "./backgroundImage.styles";

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
      <StyledContainer>
        <StyledDefault
          onClick={() => {
            displayHandler(`#202124`);
          }}
        >
          <h3>Default</h3>
        </StyledDefault>
        {mobileVersion.map((bg) => {
          return (
            <StyledImg
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
      </StyledContainer>
    </Modal>
  );
};
export default BackgroundImage;
