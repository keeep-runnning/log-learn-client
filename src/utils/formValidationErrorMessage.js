export const usernameValidationErrorMessage = Object.freeze({
  required: "유저이름을 입력해주세요.",
  length: "유저이름을 2자 이상 20자 이하로 입력해주세요.",
  pattern: "한글/영문 대소문자/숫자/언더바(_)/하이픈(-)만을 이용해 유저이름을 입력해주세요.",
  isChanged: "입력하신 유저이름이 기존 유저이름과 동일합니다."
});

export const emailValidationErrorMessage = Object.freeze({
  required: "이메일을 입력해주세요.",
  pattern: "이메일 형식이 올바르지 않습니다."
});

export const passwordValidationErrorMessage = Object.freeze({
  required: "비밀번호를 입력해주세요.",
  length: "비밀번호를 8자 이상 32자 이하로 입력해주세요.",
  pattern: "영문 대소문자/숫자/특수문자를 각각 1자 이상 포함해주세요."
});

export const oldPasswordValidationErrorMessage = Object.freeze({
  required: "기존 비밀번호를 입력해주세요.",
  isValid: "기존 비밀번호가 올바르지 않습니다."
});

export const newPasswordValidationErrorMessage = Object.freeze({
  required: "새 비밀번호를 입력해주세요.",
  length: "새 비밀번호를 8자 이상 32자 이하로 입력해주세요.",
  pattern: "영문 대소문자/숫자/특수문자를 각각 1자 이상 포함해주세요.",
  isChanged: "새 비밀번호가 기존 비밀번호와 같습니다."
});

export const passwordCheckValidationErrorMessage = Object.freeze({
  required: "비밀번호 확인을 입력해주세요.",
  equalsToPassword: "비밀번호와 비밀번호 확인이 일치하지 않습니다."
});

export const newPasswordCheckValidationErrorMessage = Object.freeze({
  required: "새 비밀번호 확인을 입력해주세요.",
  equalsToPassword: "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다."
});

export const shortIntroductionValidationErrorMessage = Object.freeze({
  maxLength: "짧은 소개를 120자 이하로 입력해주세요.",
  isChanged: "변경사항이 없습니다."
});
