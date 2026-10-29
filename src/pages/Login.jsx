import React from "react";
import TitleLogo from "../components/TitleLogo";
import { useNavigate } from "react-router";
import loginCheck from "../services/loginCheck";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordPlaceHolder, setPasswordPlaceHolder] = React.useState("");
  const [emailPlaceHolder, setEmailPlaceHolder] = React.useState("");

  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    setEmailPlaceHolder("");
    setPasswordPlaceHolder("");

    if (!email.trim()) {
      setEmailPlaceHolder("required");
      return;
    }

    if (!password.trim()) {
      setPasswordPlaceHolder("required");
      return;
    }

    const result = loginCheck(email.trim(), password);

    if (result === "email") {
      setEmailPlaceHolder("incorrect");
      return;
    }

    if (result === "password") {
      setPasswordPlaceHolder("incorrect");
      return;
    }

    navigate("/home");
    console.log("Current URL:", window.location.pathname);
  }

  return (
    <>
      <div className="login-div-container">
        <TitleLogo />
        <div className="flex-container">
          <div className="text-container">
            <p id="login-mini-text">INTERNAL RECOGNITION</p>
            <h1 id="login-moto">
              Celebrate the people moving the team forward.
            </h1>
            <p id="login-text-paragraph">
              This proof of concept gives employees a simple way to nominate,
              vote, and review past recognition cycles in one place.
            </p>
            <ul id="login-list">
              <li>Structured nomination and voting phases</li>
              <li>Clear visibility into permissions and cycle status.</li>
              <li>Simple history of previuys winners and submissions</li>
            </ul>
          </div>
          <div className="text-container">
            <h3 id="sign-in">Sign in</h3>
            <p id="sign-in-paragraph">
              Use your internal account details to access the current cycle
            </p>
            <form className="login-container" onSubmit={onSubmit}>
              {emailPlaceHolder !== "" && (
                <p className="error-message">
                  {emailPlaceHolder === "required"
                    ? "Email is required!"
                    : emailPlaceHolder === "incorrect"
                      ? "Email not found!"
                      : "Username"}
                </p>
              )}
              <input
                className="input-login"
                type="email"
                placeholder={"Username"}
                value={email}
                onChange={(email) => {
                  setEmail(email.target.value);
                  setEmailPlaceHolder("");
                }}
              ></input>
              {passwordPlaceHolder !== "" && (
                <p className="error-message">
                  {passwordPlaceHolder === "required"
                    ? "Password is required!"
                    : passwordPlaceHolder === "incorrect"
                      ? "Incorrect password!"
                      : "Password"}
                </p>
              )}
              <input
                className="input-login"
                type="password"
                placeholder={"Password"}
                value={password}
                minLength={8}
                onChange={(password) => {
                  setPassword(password.target.value);
                  setPasswordPlaceHolder("");
                }}
              ></input>
              <button className="login-btn">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
