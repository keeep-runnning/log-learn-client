import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

import RowForm from "./RowForm";
import PrimaryButton from "../common/buttons/PrimaryButton";
import useShortIntroductionSettings from "../../hooks/queries/settings/useShortIntroductionSettings";
import useNotifications from "../../hooks/useNotifications";

const SHORT_INTRODUCTION_FIELD_NAME = "shortIntroduction";

const ShortIntroductionSettingsForm = ({ data }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      [SHORT_INTRODUCTION_FIELD_NAME]: data
    }
  });

  const shortIntroductionSettingsMutation = useShortIntroductionSettings();

  const { notifySuccess } = useNotifications();

  const onValid = useCallback(({ shortIntroduction }) => {
    shortIntroductionSettingsMutation.mutate(shortIntroduction, {
      onSuccess: () => {
        notifySuccess({ content: "짧은 소개가 수정되었습니다." });
      }
    });
  }, []);

  return (
    <RowForm onSubmit={handleSubmit(onValid)}>
      <label htmlFor="short-introduction">짧은 소개</label>
      <section>
        <textarea id="short-introduction" rows="4" {...register(SHORT_INTRODUCTION_FIELD_NAME)} />
        <PrimaryButton type="submit" disabled={shortIntroductionSettingsMutation.isLoading}>수정하기</PrimaryButton>
      </section>
    </RowForm>
  );
};

ShortIntroductionSettingsForm.propTypes = {
  data: PropTypes.string.isRequired
};

export default ShortIntroductionSettingsForm;
