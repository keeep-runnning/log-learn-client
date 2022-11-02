import { css } from "@emotion/react";
import PropTypes from "prop-types";
import { IoPersonCircleSharp } from "react-icons/io5";

const UserProfileCard = ({ userData }) => {
  return (
    <div
      css={(theme) => css`
        display: flex;
        flex-direction: column;
        row-gap: ${theme.spacing[4]};
        align-items: center;
        border: ${theme.lineThickness[1]} solid ${theme.lineColor[2]};
        ${theme.borderRound.normal};
        padding: ${theme.spacing[6]};
        ${theme.mq.md} {
          flex-direction: row;
          justify-content: center;
          column-gap: ${theme.spacing[6]};
        }
      `}
    >
      <IoPersonCircleSharp
        css={(theme) => css`
          width: 48px;
          height: 48px;
          ${theme.mq.md} {
            width: 80px;
            height: 80px;
          }
        `}
      />
      <div
        css={(theme) => css`
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: ${theme.spacing[4]};
          ${theme.mq.md} {
            align-items: flex-start;
          }
        `}
      >
        <span
          css={(theme) => css`
            font-weight: ${theme.textWeight.bold};
            ${theme.textSize.xl}
          `}
        >
          {userData.username}
        </span>
        {userData.shortIntroduction ? (
          <p
            css={(theme) =>
              css`
                ${theme.textSize.base}
              `
            }
          >
            {userData.shortIntroduction}
          </p>
        ) : null}
      </div>
    </div>
  );
};

UserProfileCard.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    shortIntroduction: PropTypes.string,
  }).isRequired,
};

export default UserProfileCard;
