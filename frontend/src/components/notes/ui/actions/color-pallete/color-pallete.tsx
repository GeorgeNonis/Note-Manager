import { MdFormatColorReset } from "react-icons/md";
import { ColorPalleteProps } from "./interfaces";
import { useColorPallete } from "./useColorPallete";
import styles from "./styles.module.scss";

const ColorPallete = ({ setDisplayPalette, id, pinned }: ColorPalleteProps) => {
  const { displayHandler, colors } = useColorPallete({
    setDisplayPalette,
    id,
    pinned,
  });

  const mobileVersion = [
    `https://cdn.discordapp.com/attachments/1056419450473152533/1091697525381144636/Neilyo77_A_Japanese_Emperor_in_hes_palace_holding_a_notepad.Liv_5fd09af0-05bc-4eaa-8b87-ec72f2d01ad8.png`,
    `https://cdn.discordapp.com/attachments/1056419450473152533/1091691991114448988/Neilyo77_create_a_background-image_where_a_old_school_notepad_i_9a3c9824-510d-4ab6-b043-a8dd70df5371.png`,
    `https://cdn.discordapp.com/attachments/1056419450473152533/1091683779061489664/Neilyo77_createa_a_Background-image_of_a_scene_with_origamis_wi_0a560cd5-2484-40ae-8fd0-05adcdd5a93f.png`,
    `https://cdn.discordapp.com/attachments/1056419450473152533/1091340642648596631/Neilyo77_Createa_a_background-image_where_theres_a_old_school_n_62157ed3-0433-4c5c-a388-eb31547be754.png`,
  ];

  const images = [
    `https://cdn.discordapp.com/attachments/1056419450473152533/1095000508286107753/Neilyo77_create_a_background-image_where_a_old_school_notepad_i_2922ab85-661f-4624-8557-af84485526d5.png`,
    `https://cdn.discordapp.com/attachments/1056419450473152533/1095000808543764540/Neilyo77_Createa_a_background-image_where_theres_a_old_school_n_e759f239-809a-4e9c-bb09-a47cf01c5c8b.png`,
    `https://cdn.discordapp.com/attachments/1056419450473152533/1095001335415455764/Neilyo77_A_Japanese_Emperor_in_hes_palace_holding_a_notepad.Liv_b5016760-c92a-4c69-9220-d95c05b472a3.png`,
    `https://cdn.discordapp.com/attachments/1056419450473152533/1095001542370803722/Neilyo77_createa_a_image_where_an_old_notepad_is_on_a_table_ins_e8b3d3ad-0310-4da8-a35f-0fe8820f0e6d.png`,
  ];
  return (
    <div className={styles.content}>
      <div
        className={styles.colors}
        onClick={() => displayHandler("transparent")}
      >
        <MdFormatColorReset />
      </div>
      {mobileVersion.map((value, i) => {
        return (
          <div
            onClick={() => displayHandler(value)}
            key={i}
            style={{ background: `url(${value})` }}
            className={styles.colors}
          >
            {" "}
          </div>
        );
      })}
    </div>
  );
};
export default ColorPallete;
