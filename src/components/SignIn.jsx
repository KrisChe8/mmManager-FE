import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api";
import UserContext from "../context/UserContext";

function SignIn() {
  const navigate = useNavigate();
  const [emailUser, setEmailUser] = useState();
  const [passwordUser, setPasswordUser] = useState();

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [iconVisible, setIconVisible] = useState("active-icon");
  const [iconHide, setIconHide] = useState("");
  const [passInputType, setPassInputType] = useState("password");

  const [userData, setUserData] = useState([]);
  const [matchUser, setMatchUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const makeVisible = () => {
    setPassInputType("text");
    setIconVisible("");
    setIconHide("active-icon");
  };
  const makeInvisible = () => {
    setPassInputType("password");
    setIconVisible("active-icon");
    setIconHide("");
  };

  const LogInUserHandler = (e) => {
    e.preventDefault();
    getUser(emailUser)
      .then((response) => {
        // const user = {
        //   user_id: response.user_id,
        //   first_name: response.first_name,
        //   last_name: response.last_name,
        //   email: response.email,
        //   password: response.password,
        // };
        setUserData(response);
      })
      .then(() => {
        let realPass = userData.password;
        setLoggedInUser([]);
        if (realPass === passwordUser) {
          setMatchUser(true);
          setLoggedInUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          setEmailUser("");
          setPasswordUser("");
          setErrorMsg("");
          navigate("/home");
        } else {
          setMatchUser(false);
          setPasswordUser("");
          setErrorMsg("Oooops...Email or Password are wrong! Try again!");
        }
      });
  };

  return (
    <section className="signup">
      <div className="signForm-wrapper loginForm-wrapper">
        <h1 className="signTitle">Welcome Back! Please Sign In!</h1>
        <form onSubmit={LogInUserHandler}>
          <ul className="signList">
            <li>
              <label className="signLabel" htmlFor="email">
                Enter your email:
              </label>
              <input
                className="signInput"
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
                type="email"
                id="email"
                placeholder="john@mmmanager.com"
                required
              />
            </li>

            <li>
              <label className="signLabel" htmlFor="password">
                Password:
              </label>
              <div className="pass-wrapper">
                <input
                  className="signInput passInput"
                  value={passwordUser}
                  onChange={(e) => setPasswordUser(e.target.value)}
                  type={`${passInputType}`}
                  id="password"
                  placeholder="Password"
                  required
                />
                <span className="show-hide">
                  <i
                    onClick={makeInvisible}
                    className={`fa-regular fa-eye-slash iconPass ${iconHide}`}
                  ></i>
                  <i
                    onClick={makeVisible}
                    className={`fa-solid fa-eye iconPass ${iconVisible}`}
                  ></i>
                </span>
              </div>
            </li>
          </ul>

          {errorMsg ? <p className="successSignupMsg">{errorMsg}</p> : null}
          <button className="signBtn loginBtn">Sign In</button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
