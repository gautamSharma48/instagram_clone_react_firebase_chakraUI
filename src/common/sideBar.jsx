import { Avatar, Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo
} from "./constants";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import useLogOut from "../hooks/useLogOut";
import useAuthStore from "../store/authStore";
import { history } from "../manager/history";
const SideBar = () => {
  const authUser = useAuthStore((state) => state.user);
  const { handleLogOut, isLoggingOut } = useLogOut();
  const sideBarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/"
    },
    {
      icon: <SearchLogo size={25} />,
      text: "Search"
    },
    {
      icon: <NotificationsLogo size={25} />,
      text: "Notifications"
    },
    {
      icon: <CreatePostLogo size={25} />,
      text: "Create"
    },
    {
      icon: <Avatar size={"sm"} src={authUser?.profilePictureURL} />,
      text: "Profile",
      link: `/${authUser?.username}`
    }
  ];
  return (
    <>
      <Box
        height={"100vh"}
        borderColor={"whiteAlpha.300"}
        borderRight={"1px solid"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
      >
        <Flex gap={10} w="full" height={"full"} direction={"column"}>
          <Link
            to={"/"}
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            cursor="pointer"
          >
            <InstagramLogo />
          </Link>
          <Link
            to={"/"}
            as={RouterLink}
            p={2}
            _hover={{ bg: "whiteAlpha.200" }}
            w={10}
            display={{ base: "block", md: "none" }}
            cursor="pointer"
          >
            <InstagramMobileLogo />
          </Link>
          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            {sideBarItems.map((item, index) => (
              <Tooltip
                hasArrow
                label={item.text}
                ml={1}
                key={index}
                openDelay={500}
                display={{ base: "block", md: "none" }}
              >
                <Flex
                  onClick={() => item.link && history.push(item.link)}
                  alignItems={"center"}
                  gap={4}
                  _hover={{ bg: "whiteAlpha.400", borderRadius: 4 }}
                  p={2}
                  w={{ base: 10, md: "full" }}
                  justifyContent={{ base: "center", md: "flex-start" }}
                >
                  {item.icon}
                  <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
                </Flex>
              </Tooltip>
            ))}
          </Flex>
          <Tooltip
            hasArrow
            label={"Log Out"}
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Flex
              mt={"auto"}
              alignItems={"center"}
              gap={4}
              _hover={{ bg: "whiteAlpha.400", borderRadius: 4 }}
              p={2}
              w={{ base: 10, md: "full" }}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <BiLogOut size={25} />
              <Button
                isLoading={isLoggingOut}
                onClick={handleLogOut}
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                display={{ base: "none", md: "block" }}
              >
                Log Out
              </Button>
            </Flex>
          </Tooltip>
        </Flex>
      </Box>
    </>
  );
};

export default SideBar;
