import { useState, useCallback, useEffect, forwardRef, useRef } from "react";
import { StyledLoadingSemiCircle } from "../../../../globalStyles";
import { ButtonProps } from "./button.props";
import { StyledButton } from "./button.styles";

/**
 * Button component which provides loading and throttling functionality.
 *
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @param {boolean} disabled - Determines if the button should start in a disabled state.
 * @param {boolean} loading - Indicates if the button should show as loading.
 * @param {Function} onClick - Callback function when the button is clicked.
 * @param {boolean} enableThrottle - If set to true, button clicks will be throttled.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref forwarded for DOM access.
 * @param {number} delayThrottle - Duration in milliseconds for which the button remains disabled after a click. Default is 1 second.
 *
 * @example
 * <Button onClick={handleClick} enableThrottle>
 *   Click Me
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled,
      loading,
      onClick,
      enableThrottle,
      delayThrottle = 1000,
      ...props
    },
    ref
  ) => {
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [isLoading, setIsLoading] = useState(loading);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const throttleOnClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        if (enableThrottle) {
          setIsDisabled(true);
          timeoutRef.current = setTimeout(() => {
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

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <StyledButton
        ref={ref}
        disabled={isDisabled || isLoading}
        {...props}
        onClick={throttleOnClick}
      >
        {isLoading ? <StyledLoadingSemiCircle /> : children}
      </StyledButton>
    );
  }
);
export default Button;
