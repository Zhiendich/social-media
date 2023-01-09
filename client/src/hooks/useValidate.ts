export const isValidEmail = (email: string) => {
  if (email.trim() !== "") {
    return /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(
      email
    );
  }
  return false;
};
export const isPasswordValid = (password: string) => {
  if (password.trim() !== "") {
    return /[0-9a-zA-Z!@#$%^&*]{6,}/.test(password);
  }
  return false;
};
export const isPhoneValid = (phone: string) => {
  if (phone.trim() !== "" && phone.length >= 9 && phone.length <= 14) {
    return true;
  }
  return false;
};
