import BaseContainer from "./BaseContainer";
import LoadingMessage from "./LoadingMessage";

type LazyPageLoadingMessageProps = {
  message?: string;
};

export default function LazyPageLoadingMessage({
  message = "페이지를 가져오는 중입니다",
}: LazyPageLoadingMessageProps) {
  return (
    <BaseContainer>
      <LoadingMessage message={message} />
    </BaseContainer>
  );
}
