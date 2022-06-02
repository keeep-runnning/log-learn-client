import { useCallback } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import PrimaryButton from "../common/buttons/PrimaryButton";
import RowForm from "./RowForm";
import useUsernameSettings from "../../hooks/queries/settings/useUsernameSettings";

const UsernameSettingsForm = ({ data }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: data
    }
  });

  const usernameSettingsMutation = useUsernameSettings();

  const onValid = useCallback(({ username }) => {
    usernameSettingsMutation.mutate(username);
  }, [usernameSettingsMutation]);

  return (
    <RowForm onSubmit={handleSubmit(onValid)}>
      <label htmlFor="username">유저이름</label>
      <section>
        <input id="username" type="text" {...register("username")} />
        <PrimaryButton type="submit" disabled={usernameSettingsMutation.isLoading}>
          수정하기
        </PrimaryButton>
      </section>
    </RowForm>
  );
};

UsernameSettingsForm.propTypes = {
  data: PropTypes.string.isRequired
}

export default UsernameSettingsForm;
