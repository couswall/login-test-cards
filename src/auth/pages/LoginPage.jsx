import { useContext, useState } from "react";
import { useFetch, useForm } from "../../hooks/";
import "./styles/LoginPage.css";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const { username, password, onInputChange } = useForm({
    username: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState({
    isValid: true,
    errorLogin: "dsd",
  });
  const url = "https://randomuser.me/api";
  const { data, isLoading, hasError } = useFetch(url);
  const { results = [] } = !!data && data;

  const onSubmit = (e) => {
    e.preventDefault();
    if (username.length <= 1 || password.length <= 1) return;

    if (
      username.trim() === results[0]?.login.username &&
      password.trim() === results[0]?.login.password
    ) {
      setIsFormValid({
        isValid: true,
        errorLogin: "",
      });

      login(username);
    } else {
      setIsFormValid({
        isValid: false,
        errorLogin: "Los datos son incorrectos",
      });
    }
  };

  return (
    <>
      <div className="form-section flex flex-d-column">
        <div className="form-container flex flex-d-column">
          <h2>Login</h2>

          {!isLoading && (
            <div className="user-data">
              <p>
                <strong>Username:</strong> {results[0]?.login.username}
              </p>
              <p>
                <strong>Password:</strong> {results[0]?.login.password}
              </p>
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="input-container">
              <label>Username: </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onInputChange}
              />
            </div>

            <div className="input-container">
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </div>

            {!isFormValid.isValid && (
              <div className="error-login">
                <p>{isFormValid.errorLogin}</p>
              </div>
            )}

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};
