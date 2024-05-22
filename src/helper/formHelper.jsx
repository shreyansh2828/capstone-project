import { v4 as uuidv4 } from "uuid";

export const handleRegisterSubmit = async (
  evt,
  email,
  username,
  password,
  confirmPassword,
  resetEmail,
  resetUsername,
  resetPassword,
  resetConfirmPassword
) => {
  evt.preventDefault();

  // Check if the username is empty
  if (username.trim() === "") {
    return "Username cannot be empty.";
  }

  // Check if the password is at least 8 characters long
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    return "Password and confirm password do not match.";
  }

  // Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email.";
    // return  false;
  }

  // alert(
  //   `Submitting Email: ${email}, Username: ${username}, Password:  ${password}, Confirm Password: ${confirmPassword}`
  // );

  // make api call in a best way here
  try {
    const response = await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proofId: uuidv4(),
        email,
        username,
        password,
      }),
    });

    if (response.ok) {
      // API call successful, handle the response here
      const data = await response.json();
      console.log(data);
      return "success";
    } else {
      // API call failed, handle the error here
      const error = await response.json();
      console.error(error);
      return false;
    }
  } catch (error) {
    // Handle any network or other errors here
    console.error(error);
  }

  resetEmail();
  resetUsername();
  resetPassword();
  resetConfirmPassword();
};

export const handleLoginSubmit = async (
  evt,
  email,
  password,
  resetEmail,
  resetPassword
) => {
  evt.preventDefault();

  // Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email.");
    return;
  }

  // Check if the password is at least 8 characters long
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  // alert(
  //   `Submitting Email: ${email}, Username: ${username}, Password:  ${password}, Confirm Password: ${confirmPassword}`
  // );

  try {
    const loginResponse = await fetch("http://localhost:5000/user");
    const usersList = await loginResponse.json();
    console.log(usersList);
    const matchedUser = usersList.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      // Store session data
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("userData", JSON.stringify(matchedUser));

      return true;
    } else {
      // API call failed, handle the error here
      console.error("Credentials are incorrect");
      return false;
    }
  } catch (error) {
    // Handle any network or other errors here
    console.error(error);
  }
  resetEmail();
  resetPassword();
};
