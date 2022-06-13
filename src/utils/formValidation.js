export const usernameValidation = Object.freeze({
  minLength: 2,
  maxLength: 20,
  pattern: /^[ㄱ-ㅎ가-힣\w-]+$/,
  isChanged({ oldUsername, newUsername }) {
    return oldUsername !== newUsername;
  }
});

export const emailValidation = Object.freeze({
  pattern: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
});

export const passwordValidation = Object.freeze({
  minLength: 8,
  maxLength: 32,
  pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
});

export const passwordCheckValidation = Object.freeze({
  equalsToPassword({ password, passwordCheck }) {
    return password === passwordCheck;
  }
});

export const shortIntroductionValidation = Object.freeze({
  maxLength: 120,
  isChanged({ oldShortIntroduction, newShortIntroduction }) {
    return oldShortIntroduction !== newShortIntroduction;
  }
});
