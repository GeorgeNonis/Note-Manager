import { ReactElement, useState } from "react";
import { AccountSettingsProps } from "./interfaces";
import { useDispatch, useSelector } from "react-redux";
import { openAccountSettings } from "../../../store/display-state-slice";
import * as Components from "../../index";
import { IRootState } from "../../../store/store";
import { Modal } from "../../Molecules";
import styles from "./styles.module.scss";
import { StyledColumn1, StyledColumn2 } from "./accountSettings.styles";

const AccountSettings = ({ open }: AccountSettingsProps) => {
  const { ...initialState } = useSelector((state: IRootState) => state.notes);
  const [option, setOption] = useState<string>("Info");
  const dispatch = useDispatch();

  type Key = {
    [key: string]: {
      el: ReactElement<any>;
    };
  };

  const options: Key = {
    Info: {
      el: <Components.AccountInfo initialState={initialState} />,
    },
    Delete: {
      el: <Components.AccountDelete initialState={initialState} />,
    },
    Avatar: {
      el: <Components.AccountAvatar initialState={initialState} />,
    },
    Password: {
      el: <Components.AccountPassword />,
    },
  };
  const navLinks = ["Info", "Avatar", "Password", "Delete"];
  return (
    <Modal
      onClose={() => dispatch(openAccountSettings())}
      open={open}
      title="Account Settings"
    >
      <div className={styles.content}>
        <StyledColumn1>
          {navLinks.map((link) => (
            <Components.NavLinkCompo
              onClick={setOption}
              text={link}
              active={option}
              key={link}
            />
          ))}
        </StyledColumn1>
        <StyledColumn2>{options[option as keyof Key].el}</StyledColumn2>
      </div>
    </Modal>
  );
};
export default AccountSettings;
