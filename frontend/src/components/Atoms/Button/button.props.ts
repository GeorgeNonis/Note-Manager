import { StyledButton } from "./button.styles";

export type StyledComponentProps<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = React.ComponentProps<C>;

export type StyledButtonProps = StyledComponentProps<typeof StyledButton>;

export interface ButtonProps extends StyledButtonProps {
  /**
   * `Optional` - Content to be rendered inside the button.
   */
  children: React.ReactNode;

  /**
   * `Optional` - Flag to throttle button click. If set, button will temporarily disable after click.
   */
  enableThrottle?: boolean;

  /**
   * `Optional` - Duration in milliseconds to disable the button after a click when throttling.
   * Default is undefined.
   */
  delayThrottle?: number;

  /**
   * `Optional` - Initial disabled state of the button. Default is false.
   */
  disabled?: boolean;

  /**
   * `Optional` - If set, button displays a loading indicator. Default is false.
   */
  loading?: boolean;
}
