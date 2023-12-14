import ReactDOM from "react-dom";
import { useAccountAvatar } from "./useAccountAvatar";
import { DEFAULT_AVTR } from "../../../../config";
import AvatarModal from "../../avataroptions/avatarOptions";
import { AccountAvatarProps } from "./accountAvatar.props";
import {
  StyledCancelButton,
  StyledImage,
  StyledSvg,
} from "./accountAvatar.styles";
import { Grid, Button } from "noniscomponents";

const AccountAvatar = ({ initialState }: AccountAvatarProps) => {
  const { values, handlers } = useAccountAvatar(initialState);
  const { image } = initialState;

  return (
    <>
      {ReactDOM.createPortal(
        <AvatarModal
          open={values.changeAvatar}
          closeModal={handlers.setChangeAvatar}
          avatarHandler={handlers.selectAvatarHandler}
        />,
        document.getElementById("avataroptions")!
      )}

      <Grid>
        <Grid css={{ position: "relative" }}>
          <StyledImage
            background={values.changeAvatar}
            onMouseEnter={() => handlers.setHoverOnAvatar(true)}
            onMouseLeave={() => handlers.setHoverOnAvatar(false)}
            onClick={handlers.setChangeAvatarHandler}
            avatar={
              !values.default_avatar &&
              !values.changeAvatar &&
              !values.saveAvatar
            }
            src={image}
            alt="user_picture"
          />
          {values.hoverOnAvatar && (
            <StyledSvg
              onClick={() => handlers.setChangeAvatar((prev) => !prev)}
              onMouseEnter={() => handlers.setHoverOnAvatar(true)}
              avatar={
                !values.default_avatar &&
                !values.changeAvatar &&
                !values.saveAvatar
              }
            />
          )}
          <StyledImage
            css={{ zIndex: `${values.twikZindex ? 12 : 1}` }}
            onClick={() => handlers.setChangeAvatar(true)}
            selectedAvatar={
              !values.default_avatar &&
              !values.changeAvatar &&
              !values.saveAvatar
            }
            src={values.selectedAvatar as string}
            alt={DEFAULT_AVTR}
          />
          {!values.default_avatar &&
            !values.changeAvatar &&
            !values.saveAvatar && (
              <StyledCancelButton
                onClick={() => handlers.setSelectedAvatar(DEFAULT_AVTR)}
              >
                Cancel
              </StyledCancelButton>
            )}
        </Grid>
        <Grid
          centerItems={true}
          autoFlow={"column"}
          css={{ gridAutoColumns: "1fr" }}
        >
          <Button
            onClick={() => handlers.setChangeAvatar(true)}
            theme={"#f26716"}
          >
            Change Avatar
          </Button>
          <Button
            theme={"#f26716"}
            disabled={values.default_avatar || values.saveAvatar}
            onClick={handlers.saveAvatarHandler}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default AccountAvatar;
