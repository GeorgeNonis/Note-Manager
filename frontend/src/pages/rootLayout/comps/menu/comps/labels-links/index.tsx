import { useRootLayout } from "../../../../useRootLayout";
import { MdOutlineLabel } from "react-icons/md";
import Link from "../../../link";

const LabelLinks = () => {
  const { state } = useRootLayout();

  const links = state.labels.map((l) => {
    return (
      <Link
        key={l.label}
        to={`labelsnotesection/:${l.labelId}`}
        role={"button"}
      >
        <MdOutlineLabel />
        <h3>{l.label}</h3>
      </Link>
    );
  });

  return <>{links}</>;
};
export default LabelLinks;
