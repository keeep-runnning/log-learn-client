import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import RowForm from "./RowForm";
import PrimaryButton from "../common/buttons/PrimaryButton";

const ShortIntroductionSettingsForm = ({ data }) => {
  const { register } = useForm({
    defaultValues: {
      shortIntroduction: data
    }
  });

  return (
    <RowForm>
      <label htmlFor="short-introduction">짧은 소개</label>
      <section>
        <textarea id="short-introduction" rows="4" {...register("shortIntroduction")} />
        <PrimaryButton type="submit">수정하기</PrimaryButton>
      </section>
    </RowForm>
  );
};

ShortIntroductionSettingsForm.propTypes = {
  data: PropTypes.string.isRequired
};

export default ShortIntroductionSettingsForm;
