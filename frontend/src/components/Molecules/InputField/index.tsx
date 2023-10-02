import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import {
  StyledCheckMark,
  StyledCorrect,
  StyledFieldSet,
  StyledInputWrapper,
  StyledPasswordNote,
  StyledSpan,
  StyledXmark,
} from "./inputField.styles";
import { InputFieldProps } from "./inputField.props";
import { Input } from "../../Atoms";

/**
 * InputField Component
 *
 * A comprehensive and styled input component that provides visual cues
 * for input validity and an option to toggle input visibility.
 *
 * @param legendText - Text that appears as a legend for the input.
 * @param errorMessage - Error message to display when input is invalid.
 * @param isValid - A flag to check if the current input is valid.
 * @param value - Current value of the input.
 * @param isFocused - A flag to determine if the input field is currently focused.
 * @param showContent - A flag to toggle the visibility of input content.
 * @param isHovered - A flag to check if input is currently being hovered.
 * @param errRef - Reference to the paragraph element showing errors.
 * @param setHovered - Setter function to change the hover state of the input.
 * @param setFocused - Setter function to change the focus state of the input.
 * @param setValue - Setter function to update the value of the input.
 * @param toggleShowContent - Function to toggle input content visibility.
 * @param ...inputProps - Any additional input properties not specified above.
 *  * @example
 * <InputField
 *   legendText="Password"
 *   errorMessage="Password is too weak"
 *   isValid={false}
 *   value="12345"
 *   isFocused={false}
 *   errRef={myErrorRef}
 *   setHovered={(hoverState) => setHoverState(hoverState)}
 *   setFocused={(focusState) => setFocusState(focusState)}
 *   setValue={(value) => setInputValue(value)}
 *   toggleShowContent={() => setShowContent(prev => !prev)}
 * />
 */
const InputField = ({
  legendText,
  errorMessage,
  isValid,
  value,
  isFocused,
  showContent,
  isHovered,
  errRef,
  setHovered,
  setFocused,
  setValue,
  toggleShowContent,
  ...inputProps
}: InputFieldProps) => {
  return (
    <StyledFieldSet>
      <legend>
        {legendText}
        {isValid ? (
          <StyledCheckMark show={isValid}>
            <StyledCorrect />
          </StyledCheckMark>
        ) : (
          !isValid &&
          value && (
            <StyledCheckMark show={!isValid}>
              <StyledXmark />
            </StyledCheckMark>
          )
        )}
      </legend>

      <StyledInputWrapper>
        <Input
          {...inputProps}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          type={showContent ? "text" : "password"}
        />
        <StyledSpan
          onClick={toggleShowContent}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {showContent ? <AiFillEye /> : <AiFillEyeInvisible />}
        </StyledSpan>
      </StyledInputWrapper>

      <StyledPasswordNote
        ref={errRef}
        id="inputfield-error"
        invalidPassword={!!(!isValid && value)}
      >
        <AiOutlineInfoCircle />
        <span>{errorMessage}</span>
      </StyledPasswordNote>
    </StyledFieldSet>
  );
};

export default InputField;
export type { InputFieldProps };
