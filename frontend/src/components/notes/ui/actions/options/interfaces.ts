export interface OptionsProps {
  id: string;
  pinned: boolean;
  styles: CSSModuleClasses;
}

export interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  textStyle?: string | undefined;
}
