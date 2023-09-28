import { Button } from "../../../../../../../components/Atoms";
import { ChangeFieldProps } from "./changeField.props";
import { StyledFieldSetDiv, StyledFieldSetImage } from "./changeField.styles";

const ChangeField = ({
  default_avatar_pic,
  avatar,
  default_avatar,
  requestState,
  setChangeAvatar,
  setDefaultAvatar,
}: ChangeFieldProps) => {
  return (
    <StyledFieldSetImage>
      <img
        src={!default_avatar ? avatar : default_avatar_pic}
        alt="avatar_image"
      />
      <StyledFieldSetDiv>
        <Button
          disabled={requestState}
          onClick={() => setChangeAvatar(true)}
          type="button"
        >
          Change
        </Button>
        <Button
          disabled={requestState}
          onClick={() => setDefaultAvatar(true)}
          type="button"
        >
          Remove
        </Button>
      </StyledFieldSetDiv>
    </StyledFieldSetImage>
  );
};
export default ChangeField;
