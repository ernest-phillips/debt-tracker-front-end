import React, { useState } from "react";

import "./styles.css";

function App() {
  // React states
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const setItems = useState([]);

  // Fake user login info
  // const database = [
  //   {
  //     username: "user1",
  //     password: "pass1",
  //   },
  //   {
  //     username: "user2",
  //     password: "pass2",
  //   },
  // ];

  // fetch user info from database
  // useEffect(() => {

  //     .then((data) => {
  //       setIsLoaded(true);
  //       setItems(data);
  //     }, []);
  // }, [setItems]);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  async function myAPI(method, path, json) {
    let url = new URL(path, "https://localhost:3000/");

    let response = await fetch(url, {
      method,
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
      // redirect: "follow",
      // referrerPolicy: "no-referrer",
    });
    console.log(response);
    if (!response.ok) {
      throw response;
    }
    let data = await response.json();
    return data;
  }

  const handleSubmit = async () => {
    // Find user login info
    const loginData = {
      authentication: {
        email: username,
        password: password,
      },
    };

    const response = await myAPI("POST", "/login", loginData);
    console.log(response);
    // fetch("https://localhost:3000/login").then((response) => response.json());

    // if (userData) {
    //   if (userData.password !== password) {
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
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
