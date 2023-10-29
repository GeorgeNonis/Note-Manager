import { SvgProps } from "./types";

const Svg = ({ cond, First, Second, ...props }: SvgProps) => {
  const firstSvg = First ? <First {...props} /> : <></>;
  const secondSvg = Second ? <Second {...props} /> : <></>;

  if (firstSvg || secondSvg) {
    return cond ? firstSvg : secondSvg;
  } else {
    return null;
  }
};
export default Svg;
