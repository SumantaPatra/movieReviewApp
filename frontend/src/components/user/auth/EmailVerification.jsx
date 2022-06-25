import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FormContainer } from "../form/FormContainer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../api/auth";
import { useNotification } from "../../../Hook";
const OTP_Length = 6;
let currentOTPIndex;
const isValid = (otp) => {
  let valid = true;
  for (let i = 0; i < 6; i++) {
    valid = !isNaN(parseInt(otp[i]));
    if (!valid) break;
  }

  return valid;
};
function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_Length).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();
  const navigator = useNavigate();
  const { state } = useLocation();
  let user = state?.user;

  const { updateNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid(otp)) {
      return console.log("Invalid Otp");
    }

    const { error, data } = await verifyEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification("error", error);
    return updateNotification("success", data.message);
  };

  function setPrevIndex(index) {
    const diff = index - 1;
    let newIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(newIndex);
  }
  const handlerChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);
    if (!value) {
      setPrevIndex(currentOTPIndex);
    } else {
      setActiveOtpIndex(currentOTPIndex + 1);
    }
    setOtp([...newOtp]);
  };
  function handlerKeydown({ key }, index) {
    currentOTPIndex = index;
    if (key === "Backspace") {
      setPrevIndex(index);
    }
  }
  useEffect(() => {
    inputRef?.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigator("/not-found");
  }, [user]);

  return (
    <FormContainer>
      <Container className="">
        <form
          onSubmit={handleSubmit}
          className="dark:bg-secondary bg-dark-subtle rounded   space-y-6 p-6"
        >
          <div>
            <Title>Please Enter Your OTP to verify Your account</Title>
            <p className="dark:text-dark-subtle text-light-subtle text-center">
              Otp has been sent to your email
            </p>
          </div>
          <div className="flex justify-between space-x-4 items-center">
            {otp.map((_, index) => {
              return (
                <input
                  type="number"
                  ref={activeOtpIndex === index ? inputRef : null}
                  onChange={(e) => handlerChange(e)}
                  onKeyDown={(e) => handlerKeydown(e, index)}
                  key={index}
                  value={otp[index] || ""}
                  className="w-10 h-10 border-2 dark:text-white text-light-subtle outline-none text-xl text-center spin-button-none rounded bg-transparent dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-light-subtle"
                />
              );
            })}
          </div>

          <Submit value="Verify Account"></Submit>
        </form>
      </Container>
    </FormContainer>
  );
}

export default EmailVerification;
