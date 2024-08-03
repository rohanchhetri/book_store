import { useState } from "react";
import axios from "axios";
import { PORT } from "../../utils/port";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Forgot = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:${PORT}/api/users`);
      const users = response.data;

      const user = users.find(
        (user) => user.username === input.username && user.email === input.email
      );

      if (user) {
        // const token = user._id;
        // const admin = user.admin;
        // const firstName = user.firstName;
        // const lastName = user.lastName;
        // const email = user.email;
        // const username = user.username;

        // localStorage.setItem("_token", token);
        // localStorage.setItem("_admin", admin);
        // localStorage.setItem("firstName", firstName);
        // localStorage.setItem("lastName", lastName);
        // localStorage.setItem("email", email);
        // localStorage.setItem("username", username);

        setPassword(user.password);
        setMessage("");
      } else {
        setPassword("");
        setMessage("Invalid username or email.");
      }
    } catch (error) {
      console.error("There was an error fetching the users!", error);
      setMessage(
        "An error occurred while verifying your information. Please try again later."
      );
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-gray-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <Link
              to={"/login"}
              className=" text-main hover:underline hover:text-indigo-500"
            >
              Back to Login
            </Link>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-main text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
          {message && <p className="mt-4 text-red-500">{message}</p>}
          {password && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-300">
              <h3 className="text-lg font-semibold text-gray-800">
                Your Password:
              </h3>
              <p className="mt-2 text-gray-700">{password}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Forgot;
