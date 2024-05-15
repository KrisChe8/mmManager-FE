import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { postNewUser } from "../../api";

function Signup() {
  const [iconVisible, setIconVisible] = useState("active-icon");
  const [iconHide, setIconHide] = useState("");
  const [passInputType, setPassInputType] = useState("password");

  const [firstN, setFirstN] = useState();
  const [lastN, setLastN] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [response, setResponse] = useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  //   useEffect(() => {}, [iconVisible]);

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

  const addNewUserHandler = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: firstN,
      last_name: lastN,
      email: email,
      password: password,
    };

    postNewUser(newUser)
      .then((response) => {
        setResponse(response.user);
        console.log(response.user);
      })
      .then(() => {
        setSuccess(true);
        setIsLoading(false);
        setFirstN("");
        setLastN("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err, "<<<<<err");
      });
  };

  return (
    <section className="signup">
      <div className="signForm-wrapper">
        <h1 className="signTitle">Sign Up!</h1>
        <form onSubmit={addNewUserHandler}>
          <ul className="signList">
            <li>
              <label className="signLabel" htmlFor="firstName">
                First Name:
              </label>
              <input
                className="signInput"
                value={firstN}
                onChange={(e) => setFirstN(e.target.value)}
                type="text"
                id="firstName"
                placeholder="First name"
                required
              />
            </li>
            <li>
              <label className="signLabel" htmlFor="lastName">
                Last Name:
              </label>
              <input
                className="signInput"
                value={lastN}
                onChange={(e) => setLastN(e.target.value)}
                type="text"
                id="lastName"
                placeholder="Last name"
                required
              />
            </li>
            <li>
              <label className="signLabel" htmlFor="email">
                Email:
              </label>
              <input
                className="signInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <>
              {/* {error ? <p>{error}</p> : <p>{response}</p>} */}
              {success ? (
                <p className="successSignupMsg">
                  Thank you for joining!
                  <Link className="switchSignInLink" to="/signin">
                    Please sign in!
                  </Link>
                </p>
              ) : null}
            </>
          )}
          <button className="signBtn">Join</button>
        </form>
      </div>
    </section>
  );
}

export default Signup;
