export const checkValidEmail = (email) => {
  if(!email) return false;
  const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexForEmail.test(email);
};