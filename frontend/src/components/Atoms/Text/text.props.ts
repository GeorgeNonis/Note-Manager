import { config } from "../../../../globalStyles";
import { StyledComponentProps } from "../Button/button.props";
import { StyledText } from "./text.styles";

export type ThemeColors = typeof config.theme.colors;

export const textSizes = ["xs", "s", "m", "l", "xl"] as const;

export type StyledTextProps = StyledComponentProps<typeof StyledText>;

export interface TextProps extends Omit<StyledTextProps, "color"> {
  color?: keyof ThemeColors;
}
