import PrimaryButton from "../common/buttons/PrimaryButton";
import RowForm from "./RowForm";

const UsernameSettingsForm = () => {
  return (
    <RowForm>
      <label htmlFor="username">유저이름</label>
      <section>
        <input id="username" type="text" />
        <PrimaryButton type="submit">수정하기</PrimaryButton>
      </section>
    </RowForm>
  );
};

export default UsernameSettingsForm;
