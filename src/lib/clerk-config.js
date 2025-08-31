export const clerkConfig = {
  // Disable all social providers
  socialButtonsPlacement: "none",

  // Enable username/password authentication
  signIn: {
    // Disable social providers
    socialButtonsPlacement: "none",
    // Hide social buttons completely
    hideSocialButtons: true,
    // Use username instead of email
    identifier: "username",
    // Enable username/password
    initialValues: {
      identifier: "",
      password: "",
    },
  },

  signUp: {
    // Disable social providers
    socialButtonsPlacement: "none",
    // Hide social buttons completely
    hideSocialButtons: true,
    // Use username instead of email
    identifier: "username",
    // Enable username/password
    initialValues: {
      username: "",
      emailAddress: "",
      password: "",
    },
  },
};
