/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import SC from "../../themes/styledComponents";
import "./Modal.scss";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authActions";

export default function LoginModal({ setShowLoginModal, showLoginModal }) {
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const [errorHandler, setErrorHandler] = useState({
    error: false,
    message: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetching(true);
    if (usermail.length > 0 && password.length > 0) {
      const fetchUser = async () => {
        await dispatch(
          login(
            {
              usermail: usermail,
              password: password,
            },
            setErrorHandler,
            setFetching
          )
        );
      };

      const followUp = async () => {
        setUsermail("");
        setPassword("");
      };

      fetchUser().then(() => followUp());

      setTimeout(() => {
        setFetching(false);
        setShowLoginModal(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (usermail.length > 0 && password.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [usermail, password]);

  return (
    <SC.ModalPage className={`modal-page ${showLoginModal ? "open" : "close"}`}>
      <SC.ModalContainer
        className={`modal-container ${showLoginModal ? "open" : "close"}`}
      >
        <div className="modal-input-container">
          <form onSubmit={isValid ? handleSubmit : null}>
            <div className="input-wrapper">
              <SC.authInput
                className="auth-input"
                type="text"
                placeholder="Username or email"
                onChange={(e) => setUsermail(e.target.value)}
                required
              ></SC.authInput>
            </div>

            <div className="input-wrapper">
              <SC.authInput
                className="auth-input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              ></SC.authInput>
            </div>

            <SC.primaryColorButtonInverse className={`auth-button ${isValid}`}>
              <div className="login-button-wrapper">
                {fetching ? (
                  <CircularProgress color="white" size="18px" />
                ) : (
                  "Login"
                )}
              </div>
            </SC.primaryColorButtonInverse>
          </form>
        </div>
      </SC.ModalContainer>
      <SC.ModalBackground
        className={`modal-background ${showLoginModal ? "open" : "close"}`}
        onClick={() => setShowLoginModal(false)}
      ></SC.ModalBackground>
    </SC.ModalPage>
  );
}
