import { forwardRef } from "react";
import { TextProps } from "./text.props";
import { StyledText } from "./text.styles";

const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ css, color, ...props }, ref) => (
    <StyledText
      {...props}
      css={{
        ...css,
        ...(color && {
          color: `$${color}`,
        }),
      }}
      ref={ref}
    />
  )
);

Text.displayName = "Text";

export default Text;

export { StyledText };
