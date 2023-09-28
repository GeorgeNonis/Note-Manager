import { StyledButton } from "./button.styles";

export type StyledComponentProps<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = React.ComponentProps<C>;

export type StyledButtonProps = StyledComponentProps<typeof StyledButton>;

export interface ButtonProps extends StyledButtonProps {
  children: React.ReactNode;
  enableThrottle?: boolean;
  delayThrottle?: number;
  disabled?: boolean;
  loading?: boolean;
}
