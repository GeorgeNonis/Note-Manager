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
