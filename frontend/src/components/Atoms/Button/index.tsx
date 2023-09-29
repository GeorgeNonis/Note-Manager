import { useState, useCallback, useEffect } from "react";
import { StyledLoadingSemiCircle } from "../../../../globalStyles";
import { ButtonProps } from "./button.props";
import { StyledButton } from "./button.styles";

const Button = ({
  children,
  disabled,
  loading,
  onClick,
  enableThrottle,
  delayThrottle = 1000,
  type,
  ...props
}: ButtonProps) => {
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isLoading, setIsLoading] = useState(loading);

  const throttleOnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (enableThrottle || type === "submit") {
        setIsDisabled(true);

        setTimeout(() => {
          setIsDisabled(false);
        }, delayThrottle);
      }
    },
    [delayThrottle, enableThrottle, onClick]
  );

  useEffect(() => {
    setIsDisabled(disabled);
    setIsLoading(loading);
  }, [disabled, loading]);

  return (
    <StyledButton
      type={type}
      disabled={isDisabled || isLoading}
      {...props}
      onClick={throttleOnClick}
    >
      {isLoading ? <StyledLoadingSemiCircle /> : children}
    </StyledButton>
  );
};
export default Button;
