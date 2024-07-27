// actions/authActions.js
export const login = (token) => {
  return {
    type: "LOGIN",
    payload: {
      isLogged: true,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      token,
    },
  };
};
