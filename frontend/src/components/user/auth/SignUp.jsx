import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import CustomLink from "../../../CustomLink";
import { commonClass } from "../../../utils/theme";
import { FormContainer } from "../form/FormContainer";
import { useState } from "react";
import { createUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../Hook";
function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userInfo;
  const navigator = useNavigate();
  const { updateNotification } = useNotification();

  const validateUserInfo = ({ name, email, password }) => {
    const isValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidName = /^[a-z A-z]+$/;
    if (!name.trim()) return { ok: false, error: "Name is missing" };
    if (!isValidName.test(name)) return { ok: false, error: "Invalid Name" };

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
    const response = await createUser(userInfo);
    if (response.error) return updateNotification("error", response.error);

    navigator("/auth/verification", {
      state: { user: response },
      replace: true,
    });
  };
  return (
    <FormContainer>
      <Container className="">
        <form onSubmit={handleSubmit} className={commonClass + " w-72"}>
          <Title>SignUp</Title>
          <FormInput
            name="name"
            value={name}
            label="name"
            placeholder="pina patra"
            onChange={handleChange}
          >
            Name
          </FormInput>
          <FormInput
            name="email"
            value={email}
            label="email"
            placeholder="patra@email.com"
            onChange={handleChange}
          >
            Email
          </FormInput>
          <FormInput
            name="password"
            value={password}
            label="password"
            placeholder="*********"
            type="password"
            onChange={handleChange}
          >
            Password
          </FormInput>
          <Submit value="Sign up"></Submit>
          <div className="flex justify-between">
            <CustomLink path="/auth/forget-password">
              Forget Password
            </CustomLink>
            <CustomLink path="/auth/sign-in">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

export default SignUp;
