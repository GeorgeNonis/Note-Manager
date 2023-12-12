import Info from "./info";
import { AccountInfoProps } from "./accountInfo.props";
// import { Grid } from "../../../Molecules";
import { Grid } from "noniscomponents";

const AccountInfo = ({ initialState }: AccountInfoProps) => {
  const { email, date, lastTimeDitedNote } = initialState;
  const info = [
    { name: "E-Mail", type: "text", value: email },
    { name: "Date of registration", value: date },
    { name: "Last time you edited a Note", value: lastTimeDitedNote },
  ];
  return (
    <div>
      <Grid gap={"32"} css={{ padding: "$4" }}>
        {info.map((inf, index) => (
          <Info {...inf} key={index} />
        ))}
      </Grid>
    </div>
  );
};
export default AccountInfo;
