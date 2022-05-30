import RowForm from "./RowForm";

const EmailSettingsForm = () => {
  return (
    <RowForm>
      <label htmlFor="email">이메일</label>
      <section>
        <input id="email" type="email" disabled />
      </section>
    </RowForm>
  );
};

export default EmailSettingsForm;
