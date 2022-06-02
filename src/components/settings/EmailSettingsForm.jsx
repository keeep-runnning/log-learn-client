import PropTypes from "prop-types";

import RowForm from "./RowForm";

const EmailSettingsForm = ({ data }) => {
  return (
    <RowForm>
      <label htmlFor="email">이메일</label>
      <section>
        <input id="email" type="email" disabled value={data} />
      </section>
    </RowForm>
  );
};

EmailSettingsForm.propTypes = {
  data: PropTypes.string.isRequired
};

export default EmailSettingsForm;
