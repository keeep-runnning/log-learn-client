import { format, differenceInDays, formatDistanceToNow, differenceInSeconds } from "date-fns";
import { ko } from "date-fns/locale";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

function formatDateTime(dateTime, now) {
  const diffDays = differenceInDays(now, dateTime);
  if (diffDays < 7) {
    const diffSeconds = differenceInSeconds(now, dateTime);
    if (diffSeconds <= 30) {
      return "방금 전";
    } else {
      return formatDistanceToNow(dateTime, { addSuffix: true, locale: ko });
    }
  }
  return format(dateTime, "yyyy년 MM월 dd일", { locale: ko });
}

const DateTime = ({ dateTimeStr, ...props }) => {
  return (
    <div
      {...props}
      css={(theme) => css`
        color: ${theme.textColor[2]};
        ${theme.textSize.sm}
      `}
    >
      {formatDateTime(new Date(dateTimeStr), new Date())}
    </div>
  );
};

DateTime.propTypes = {
  dateTimeStr: PropTypes.string.isRequired,
};

export default DateTime;
