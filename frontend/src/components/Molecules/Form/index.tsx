import { forwardRef } from "react";
import { StyledForm } from "./form.styles";
import { FormProps } from "./form.props";

/**
 * Form Component
 *
 * A styled form component that can optionally unset its default background and border.
 *
 * @param {React.ReactNode} children - React child components to be displayed within the form.
 * @param {boolean} backgroundUnset - Determines if the default background and border should be unset.
 * @param {React.Ref<HTMLFormElement>} ref - Ref forwarded for DOM access.
 * @param {...object} props - Additional properties passed to the StyledForm component.
 *
 * @example
 * <Form backgroundUnset={true}>
 *   <input type="text" placeholder="Enter your name" />
 *   <button type="submit">Submit</button>
 * </Form>
 */
const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, backgroundUnset, ...props }, ref) => (
    <StyledForm backgroundUnset={backgroundUnset} {...props} ref={ref}>
      {children}
    </StyledForm>
  )
);
export default Form;
