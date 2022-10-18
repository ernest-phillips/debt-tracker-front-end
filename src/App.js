import React, { useState } from "react";

import "./styles.css";

function App() {
  // React states
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fake user login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = () => {
    // Find user login info
    const userData = database.find((user) => user.username === username);

    if (userData) {
      if (userData.password !== password) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const onChangeUsername = (element) => {
    setUsername(element.target.value);
  };

  const onChangePassword = (element) => {
    setPassword(element.target.value);
  };

  // JSX login form
  const renderForm = (
    <div className="form">
      <div className="input-container">
        <label>Username </label>
        <input
          type="text"
          name="uname"
          value={username}
          onChange={onChangeUsername}
          required
        />
        {renderErrorMessage("uname")}
      </div>
      <div className="input-container">
        <label>Password </label>
        <input
          type="password"
          name="pass"
          onChange={onChangePassword}
          value={password}
          required
        />
        {renderErrorMessage("pass")}
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="container"></div>
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}
export default App;
