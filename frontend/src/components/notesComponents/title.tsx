import { MutableRefObject } from "react";

interface Props {
  titleRef?: MutableRefObject<HTMLHeadingElement | null>;
  title: string;
  editable?: boolean;
}

const Title = ({ titleRef, title, editable }: Props) => {
  return (
    <h3
      style={{ overflowWrap: `${editable ? "unset" : "anywhere"}` }}
      ref={titleRef}
      contentEditable={editable ? "true" : "false"}
      spellCheck="true"
      aria-multiline="true"
      suppressContentEditableWarning
    >
      {title}
    </h3>
  );
};

export default Title;
