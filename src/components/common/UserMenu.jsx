import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useCallback } from "react";
import {
  IoChevronDown,
  IoHomeOutline,
  IoLogOutOutline,
  IoPencil,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/queries/auth/useLogout";
import pageUrl from "../../utils/pageUrl";

export default function UserMenu({ username }) {
  const toast = useToast();

  const navigate = useNavigate();

  const logoutMutation = useLogout();

  const handleLogoutButtonClick = useCallback(() => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        toast({
          description: "로그아웃 되었습니다",
          status: "success",
          isClosable: true,
          position: "top",
        });
        navigate("/");
      },
    });
  }, []);

  const linkMenus = [
    {
      name: "내 블로그로 이동",
      link: pageUrl.getUserHomePageUrl(username),
      icon: <IoHomeOutline />,
    },
    { name: "글쓰기", link: pageUrl.getPostPublicationPageUrl(), icon: <IoPencil /> },
    { name: "설정", link: pageUrl.getSettingsPageUrl(), icon: <IoSettingsOutline /> },
  ];

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} variant="ghost" rightIcon={<IoChevronDown />}>
        {username}
      </MenuButton>
      <MenuList>
        <MenuGroup>
          {linkMenus.map((linkMenu) => (
            <MenuItem key={linkMenu.link} as={Link} to={linkMenu.link} icon={linkMenu.icon}>
              {linkMenu.name}
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem
            icon={<IoLogOutOutline />}
            isDisabled={logoutMutation.isLoading}
            onClick={handleLogoutButtonClick}
          >
            로그아웃
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
};
