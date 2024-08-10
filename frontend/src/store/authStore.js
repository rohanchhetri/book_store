const token = localStorage.getItem("_token") ?? null;
const admin =
  localStorage.getItem("_admin") === "true" ||
  sessionStorage.getItem("_admin") === "true"
    ? true
    : false;
const initialState = {
  isLogged: token !== null ? true : false,
  token: token,
  admin: admin,
  username: "username",
  email: "example@gmail.com",
  firstName: "John",
  lastName: "Doe",
  dob: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogged: action.payload.isLogged,
        token: action.payload.token,
        admin: action.payload.admin,
        username: action.payload.username,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        dob: action.payload.dob,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogged: false,
        token: "",
        admin: false,
        username: "username",
        email: "example@gmail.com",
        firstName: "First",
        lastName: "Last",
        dob: "",
      };
    default:
      return state;
  }
};
