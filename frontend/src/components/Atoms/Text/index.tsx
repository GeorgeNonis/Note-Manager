import { forwardRef } from "react";
import { TextProps } from "./text.props";
import { StyledText } from "./text.styles";

/**
 * Text component build on StyledText used to display text.
 *
 * @param {string} color - The color of the text.
 * @param {React.CSSProperties} css - Custom styles for the text component.
 * @param {React.ReactNode} children - The content to be displayed inside the text.
 * @param {React.Ref<HTMLSpanElement>} ref - Ref forwarded for DOM access.
 *
 * @example
 * <Text color="primary">Hello World</Text>
 */
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
