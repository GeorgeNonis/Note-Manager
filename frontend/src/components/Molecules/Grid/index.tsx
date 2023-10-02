import { forwardRef, ReactElement } from "react";
import { GridProps } from "./grid.props";
import { StyledGrid } from "./grid.styles";

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (props, ref): ReactElement => <StyledGrid {...props} ref={ref} />
);

Grid.displayName = "Grid";

export default Grid;

export { StyledGrid };
