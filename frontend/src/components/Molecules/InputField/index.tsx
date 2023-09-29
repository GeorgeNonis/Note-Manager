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
  isFocused,
  showContent,
  isHovered,
  errRef,
  setHovered,
  setFocused,
  setValue,
  toggleShowContent,
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
          !isValid && (
            <StyledCheckMark show={!isValid}>
              <StyledXmark />
            </StyledCheckMark>
          )
        )}
      </legend>

      <StyledInputWrapper>
        <Input
          backgroundUnset
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          type={showContent ? "text" : "password"}
        />
        <StyledSpan
          onClick={toggleShowContent}
          onMouseEnter={() => setHovered(!isHovered)}
          onMouseLeave={() => setHovered(!isHovered)}
        >
          {isHovered || showContent ? <AiFillEye /> : <AiFillEyeInvisible />}
        </StyledSpan>
      </StyledInputWrapper>

      <StyledPasswordNote
        ref={errRef}
        id="inputfield-error"
        invalidPassword={!isValid && isFocused}
      >
        <AiOutlineInfoCircle />
        <span>{errorMessage}</span>
      </StyledPasswordNote>
    </StyledFieldSet>
  );
};

export default InputField;
