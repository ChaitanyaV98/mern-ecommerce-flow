export const registerFormControls = [
  {
    name: "username",
    placeholder: "Enter your user name",
    label: "User Name",
    type: "text",
    componentType: "input",
  },

  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
  },
];

export const registerFormInitialStateControls = {
  username: "",
  email: "",
  password: "",
};

export const loginFormControls = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
  },
];

export const loginFormInitialStateControls = {
  email: "",
  password: "",
};
