import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import { FormContainer } from "../form/FormContainer";
import { commonClass } from "../../../utils/theme";
function ConfirmPassword() {
  return (
    <FormContainer>
      <Container className="">
        <form className={commonClass + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput name="password" label="password" placeholder="********">
            New Password
          </FormInput>
          <FormInput
            name="confirmPassword"
            label="confirmPassword"
            placeholder="********"
          >
            Confirm Password
          </FormInput>

          <Submit value="Confirm Password"></Submit>
        </form>
      </Container>
    </FormContainer>
  );
}

export default ConfirmPassword;
