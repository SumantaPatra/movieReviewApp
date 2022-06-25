import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import CustomLink from "../../../CustomLink";
import { commonClass } from "../../../utils/theme";
import { FormContainer } from "../form/FormContainer";
import { useState } from "react";
import { useNotification } from "../../../Hook";
import { useAuth } from "../../../Hook";
function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // const { email, password } = userInfo;
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const validateUserInfo = ({ email, password }) => {
    const isValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.trim()) return { ok: false, error: "Email is missing" };
    if (!isValidMail.test(email)) return { ok: false, error: "Invalid Email" };

    if (!password.trim()) return { ok: false, error: "password is missing" };
    if (password.length < 8)
      return { ok: false, error: "Password must be of 8 characters" };

    return { ok: true };
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);
    await handleLogin(userInfo.email, userInfo.password);
    console.log(authInfo);
  };

  return (
    <FormContainer>
      <Container className="">
        <form onSubmit={handleSubmit} className={commonClass + " w-72"}>
          <Title>SignIn</Title>
          <FormInput
            name="email"
            label="email"
            value={userInfo.email}
            placeholder="patra@email.com"
            onChange={handleChange}
          >
            Email
          </FormInput>
          <FormInput
            name="password"
            value={userInfo.password}
            label="password"
            placeholder="*********"
            type="password"
            onChange={handleChange}
          >
            Password
          </FormInput>
          <Submit value="Sign in"></Submit>
          <div className="flex justify-between">
            <CustomLink path="/auth/forget-password">
              Forget Password
            </CustomLink>
            <CustomLink path="/auth/sign-up">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

export default SignIn;
