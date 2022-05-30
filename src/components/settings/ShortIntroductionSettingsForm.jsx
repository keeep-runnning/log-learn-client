import RowForm from "./RowForm";
import PrimaryButton from "../common/buttons/PrimaryButton";

const ShortIntroductionSettingsForm = () => {
  return (
    <RowForm>
      <label htmlFor="short-introduction">짧은 소개</label>
      <section>
        <textarea id="short-introduction" rows="4"></textarea>
        <PrimaryButton type="submit">수정하기</PrimaryButton>
      </section>
    </RowForm>
  );
};

export default ShortIntroductionSettingsForm;
