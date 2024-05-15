import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import Signup from "./Signup";

function SignInUpManager() {
  const [registerClass, setRegisterClass] = useState("");
  const [loginClass, setLoginClass] = useState("");

  const location = useLocation();
  const { hash, pathname, search } = location;

  //   localStorage.clear();

  useEffect(() => {
    if (pathname == "/signin") {
      setLoginClass("signClass-active");
      setRegisterClass("");
    } else {
      setRegisterClass("signClass-active");
      setLoginClass("");
    }
  }, [pathname]);

  const gotoLoginHandler = () => {
    setRegisterClass("");
    setLoginClass("signClass-active");
  };
  const gotoRegisterHandler = () => {
    setRegisterClass("signClass-active");
    setLoginClass("");
  };
  return (
    <section className="signForm">
      <header className="loginForm-header">
        <i className="fa-solid fa-money-bill-transfer mainLogo"></i>
        <p className="companyName headerTitle">My Money Manager</p>
      </header>
      <div className="switchForms">
        <div className="linkwrapper">
          <Link
            className={`linktoForm ${registerClass}`}
            to="/"
            onClick={gotoRegisterHandler}
          >
            Register
          </Link>
        </div>
        <div className="linkwrapper">
          <Link
            className={`linktoForm ${loginClass}`}
            to="/signin"
            onClick={gotoLoginHandler}
          >
            Login
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </section>
  );
}

export default SignInUpManager;
