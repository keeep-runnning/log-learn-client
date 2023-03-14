import { Link } from "react-router-dom";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  IoChevronDown,
  IoHomeOutline,
  IoLogOutOutline,
  IoPencil,
  IoSettingsOutline,
} from "react-icons/io5";

import { pagePath } from "../../utils/page";
import useLogout from "../../hooks/auth/useLogout";

type MyMenuProps = {
  username: string;
};

export default function MyMenu({ username }: MyMenuProps) {
  const logoutMutation = useLogout();

  const handleClickLogoutButton = () => {
    logoutMutation.mutate();
  };

  const linkMenus = [
    {
      name: "내 블로그로 이동",
      link: pagePath.getBlog(username),
      icon: <IoHomeOutline />,
    },
    { name: "글쓰기", link: pagePath.getPostPublication(), icon: <IoPencil /> },
    { name: "설정", link: pagePath.getSetting(), icon: <IoSettingsOutline /> },
  ];

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rightIcon={<IoChevronDown />}>
        {username}
      </MenuButton>
      <MenuList>
        <MenuGroup>
          {linkMenus.map((linkMenu) => (
            <MenuItem
              key={linkMenu.link}
              as={Link}
              to={linkMenu.link}
              icon={linkMenu.icon}
            >
              {linkMenu.name}
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem
            icon={<IoLogOutOutline />}
            onClick={handleClickLogoutButton}
            isDisabled={logoutMutation.isLoading}
          >
            {logoutMutation.isLoading ? "로그아웃 중..." : "로그아웃"}
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
