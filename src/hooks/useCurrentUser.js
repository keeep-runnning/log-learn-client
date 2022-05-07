import { useRecoilValue } from "recoil";

import { currentUserState } from "../recoil/currentUserState";

const useCurrentUser = () => {
  return useRecoilValue(currentUserState);
};

export default useCurrentUser;
