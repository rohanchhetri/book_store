import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Header from "../../components/Header";
import { PORT } from "../../utils/port";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:${PORT}/api/users`);
      const users = response.data;

      const user = users.find(
        (user) =>
          (user.email === identifier || user.username === identifier) &&
          user.password === password
      );

      if (user) {
        const token = user._id;
        const admin = user.admin;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const email = user.email;
        const username = user.username;
        const dob = user.dateOfBirth;

        if (stayLoggedIn) {
          localStorage.setItem("_token", token);
          localStorage.setItem("_admin", admin);
        } else {
          sessionStorage.setItem("_token", token);
          sessionStorage.setItem("_admin", admin);
        }
        console.log(admin);
        // Dispatch action to update isLogged in Redux store
        dispatch({
          type: "LOGIN",
          payload: {
            isLogged: true,
            admin: admin,
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            token: token,
            dob: dob,
          },
        });

        // Redirect based on user role
        if (user.admin) {
          nav("/admin/dashboard");
        } else {
          nav("/");
        }
      } else {
        setError("Invalid Username/Email or Password");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error fetching users");
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-[100vh] flex-1 justify-center items-center py-12 lg:px-8">
        <div className="w-[70vw] max-w-[500px] rounded-md bg-gray-200 px-6 pb-3">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {error && (
              <Alert key="danger" variant="danger">
                {error}
              </Alert>
            )}

            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username or Email
                </label>
                <div className="mt-2">
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    autoComplete="username"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to={"/forgot-password"}
                      className="font-semibold text-main hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="stayLoggedIn"
                  name="stayLoggedIn"
                  type="checkbox"
                  checked={stayLoggedIn}
                  onChange={() => setStayLoggedIn(!stayLoggedIn)}
                  className="h-4 w-4 text-main focus:ring-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="stayLoggedIn"
                  className="ml-2 block text-sm leading-6 text-gray-900"
                >
                  Stay logged in
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-main px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a user?{" "}
              <Link
                to={"/register"}
                className="font-semibold leading-6 text-main hover:text-indigo-500"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
