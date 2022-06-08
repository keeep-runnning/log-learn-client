import { useCallback } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import PrimaryButton from "../common/buttons/PrimaryButton";
import RowForm from "./RowForm";
import useUsernameSettings from "../../hooks/queries/settings/useUsernameSettings";
import { usernameValidation } from "../../utils/formValidation";
import FormFieldErrorMessage from "../common/FormFieldErrorMessage";
import useNotifications from "../../hooks/useNotifications";

const UsernameSettingsForm = ({ data }) => {
  const { notifySuccess } = useNotifications();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
      username: data
    },
    mode: "onChange"
  });

  const usernameSettingsMutation = useUsernameSettings();

  const onValid = useCallback(({ username }) => {
    usernameSettingsMutation.mutate(username, {
      onSuccess: () => {
        notifySuccess({ content: "유저이름이 변경되었습니다." });
      },
      onError: error => {
        if(error.response) {
          const { code } = error.response.data;
          if(code === "user-001") {
            setError("username", { type: "unique", message: "이미 사용중인 유저이름 입니다." });
          }
        }
      }
    });
  }, []);

  return (
    <RowForm onSubmit={handleSubmit(onValid)}>
      <label htmlFor="username">유저이름</label>
      <section>
        <input
          id="username"
          type="text"
          {...register("username", {
            required: usernameValidation.required,
            minLength: usernameValidation.minLength,
            maxLength: usernameValidation.maxLength,
            pattern: usernameValidation.pattern,
            validate: {
              changed: usernameValidation.changed(data)
            }
          })}
        />
        <FormFieldErrorMessage message={errors.username?.message} />
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
