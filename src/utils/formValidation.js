export const usernameValidation = {
  required: "유저이름을 입력해주세요.",
  minLength: {
    value: 2,
    message: "유저이름을 2자 이상 20자 이하로 입력해주세요."
  },
  maxLength: {
    value: 20,
    message: "유저이름을 2자 이상 20자 이하로 입력해주세요."
  },
  pattern: {
    value: /^[ㄱ-ㅎ가-힣\w-]+$/,
    message: "한글/영문 대소문자/숫자/언더바(_)/하이픈(-)만을 이용해 유저이름을 입력해주세요."
  },
  changed(oldUsername) {
    return newUsername => newUsername !== oldUsername || "입력하신 유저이름이 기존 유저이름과 동일합니다.";
  }
};

export const emailValidation = {
  required: "이메일을 입력해주세요.",
  pattern: {
    value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    message: "이메일 형식이 올바르지 않습니다."
  }
};

export const passwordValidation = {
  required: "비밀번호를 입력해주세요.",
  minLength: {
    value: 8,
    message: "비밀번호를 8자 이상 32자 이하로 입력해주세요."
  },
  maxLength: {
    value: 32,
    message: "비밀번호를 8자 이상 32자 이하로 입력해주세요."
  },
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
    message: "영문 대소문자/숫자/특수문자를 각각 1자 이상 포함해주세요."
  }
};

export const passwordCheckValidation = {
  required: "비밀번호 확인을 입력해주세요.",
  equalsToPassword(password) {
    return passwordCheck => (passwordCheck === password) || "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
  }
}
