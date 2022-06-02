import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import PrimaryButton from "../common/buttons/PrimaryButton";
import RowForm from "./RowForm";

const UsernameSettingsForm = ({ data }) => {
  const { register } = useForm({
    defaultValues: {
      username: data
    }
  });

  return (
    <RowForm>
      <label htmlFor="username">유저이름</label>
      <section>
        <input id="username" type="text" {...register("username")} />
        <PrimaryButton type="submit">수정하기</PrimaryButton>
      </section>
    </RowForm>
  );
};

UsernameSettingsForm.propTypes = {
  data: PropTypes.string.isRequired
}

export default UsernameSettingsForm;
