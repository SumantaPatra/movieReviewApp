import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../../../CustomLink";
import { FormContainer } from "../form/FormContainer";
import { commonClass } from "../../../utils/theme";
function ForgetPassword() {
  return (
    <FormContainer>
      <Container className="">
        <form className={commonClass + " w-96"}>
          <Title>Please Enter Your Email</Title>
          <FormInput name="email" label="email" placeholder="patra@email.com">
            Email
          </FormInput>

          <Submit value="Send Link"></Submit>
          <div className="flex justify-between">
            <CustomLink path="/auth/sign-in">Sign in</CustomLink>
            <CustomLink path="/auth/sign-up">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

export default ForgetPassword;
