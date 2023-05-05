export const API_VERSION = import.meta.env.VITE_API_VERSION;
export const BASE_URL = `${import.meta.env.VITE_BASE_URL}${API_VERSION}`;
export const DEFAULT_AVTR = "../images/default_avatar.png";

export const URL_REGEX =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
export const PWD_REGEX: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$/;
export const USER_REGEX: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/;

export const USER_AVATAR =
  "https://cdn.discordapp.com/attachments/1056419450473152533/1090660819492147310/Neilyo77_background_image_where_theres_a_person_looking_for_hes_8875f0c2-ec7f-4826-8465-9c71c09fc32e.png";

export const mobileVersion = [
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091697525381144636/Neilyo77_A_Japanese_Emperor_in_hes_palace_holding_a_notepad.Liv_5fd09af0-05bc-4eaa-8b87-ec72f2d01ad8.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091691991114448988/Neilyo77_create_a_background-image_where_a_old_school_notepad_i_9a3c9824-510d-4ab6-b043-a8dd70df5371.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091683779061489664/Neilyo77_createa_a_Background-image_of_a_scene_with_origamis_wi_0a560cd5-2484-40ae-8fd0-05adcdd5a93f.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091340642648596631/Neilyo77_Createa_a_background-image_where_theres_a_old_school_n_62157ed3-0433-4c5c-a388-eb31547be754.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1094677739702845670/Neilyo77_createa_a_background_image_where_an_old_notepad_is_on__c6525701-03b6-4608-920e-f723fff76002.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091690263396749332/Neilyo77_create_a_background_image_of_a_samurai_sitting_below_a_84e8ae88-48f8-422c-a363-849511dbf5ee.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091687647421931540/Neilyo77_create_background_image_of_a_samurai_sitting_below_a_j_e4602fc3-2d56-4bc1-b4ac-1c143e59697d.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091682399567499365/Neilyo77_createa_a_Background-image_of_a_scene_with_flowers_wit_1c9941e1-f6c3-4f42-b086-56eab34b3d56.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091681700318281808/Neilyo77_createa_a_Background-image_of_a_scene_with_flowers_wit_c10252a5-ad20-4cfe-956a-43c9c007454a.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091335105471058010/Neilyo77_Create_a_visually_appealing_background_image_that_feat_942de6ea-b8a6-404f-9ebb-834f1f7372bf.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1091333485945434243/Neilyo77_Create_a_visually_appealing_background_image_that_feat_88d54b00-a99c-4e27-96ba-07d0074d7d37.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1095091162538323998/Neilyo77_createa_a_Background-image_of_a_scene_with_flowers_wit_bb06ef6f-2982-4411-8989-37daffc0a9c1.png`,
];

export const avatar_pictures = [
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100023303927775244/Neilyo77_A_Japanese_poet_writer_avatar_.Lively_colors._Bright_C_2ea04cc1-8fd3-4a7d-a1c8-eea252cc7e45.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100008663697064058/Neilyo77_A_Japanese_female_Emperor_avatar.Lively_colors.Starsky_3c422cee-b5ad-46cb-a3ef-cc2f57dbb019.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100023620610310276/Neilyo77_A_Japanese_poet_writer_.Lively_colors._Bright_Colors.__0bd73b96-26ca-4a6c-934d-a56ff7d1fd44.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100023914962354227/Neilyo77_A_Japanese_poet_writer_.Lively_colors._Bright_Colors.__a328746e-00d7-41a4-ac2a-2b6bb1bd475f.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100012807489081434/Neilyo77_A_Japanese_Emperor_avatar.Lively_colors._Bright_Colors_862513a3-32ac-4d6e-a439-e46e39af2c5d.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100012826069848164/Neilyo77_A_Japanese_Emperor_avatar.Lively_colors._Bright_Colors_f43f85e8-6e3b-4454-ac65-4aa215cd6100.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100013162402689044/Neilyo77_A_Japanese_Emperor_avatar.Lively_colors._Bright_Colors_5ae0e6e4-d85b-4234-8402-0c490b9e6b0c.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100010638044041256/Neilyo77_A_Japanese_female_Emperor_avatar.Lively_colors.Starsky_4ed98694-3f90-4868-b13d-ddb406002cc4.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100013134862889021/Neilyo77_A_Japanese_Emperor_avatar.Lively_colors._Bright_Colors_a908cd48-a05c-4c55-8de7-9d69b0b84367.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100012813558222868/Neilyo77_A_Japanese_Emperor_avatar.Lively_colors._Bright_Colors_94208767-0765-41b2-9647-a6b642059adf.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100023948491640874/Neilyo77_A_Japanese_poet_writer_.Lively_colors._Bright_Colors.__83a96392-2a68-4b10-86a7-d180b5b835cd.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100023633604255796/Neilyo77_A_Japanese_poet_writer_.Lively_colors._Bright_Colors.__447a997a-672f-49b9-82cf-7473066cba53.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100018711106175026/Neilyo77_A_Japanese_poet_writer_.Lively_colors._Bright_Colors.__78f8cbb2-48c0-4353-8d4b-d70940510cfa.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100023258872553493/Neilyo77_A_Japanese_poet_writer_avatar_.Lively_colors._Bright_C_8d95b777-8957-4ff5-abe8-4680887cfc0c.png`,
  `https://cdn.discordapp.com/attachments/1056419450473152533/1100023269169573898/Neilyo77_A_Japanese_poet_writer_avatar_.Lively_colors._Bright_C_290b1bd0-0d56-4785-b545-397af9a5c98d.png`,
];

export const cached_avatar_pictures = avatar_pictures.map((pic) => {
  const img = new Image();
  img.src = pic;

  return img;
});
