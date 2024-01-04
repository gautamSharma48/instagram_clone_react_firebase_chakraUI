import { Avatar, Box, Flex, Link, Tooltip } from "@chakra-ui/react";
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
const SideBar = () => {
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
      icon: <Avatar size={"sm"} name="Gautam Sharma" src="/profilePic.png" />,
      text: "Profile"
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
                <Link
                  to={item.link || null}
                  as={RouterLink}
                  display={"flex"}
                  alignItems={"center"}
                  gap={4}
                  _hover={{ bg: "whiteAlpha.400", borderRadius: 4 }}
                  p={2}
                  w={{ base: 10, md: "full" }}
                  justifyContent={{ base: "center", md: "flex-start" }}
                >
                  {item.icon}
                  <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
                </Link>
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
            <Link
              mt={"auto"}
              to={"/auth"}
              as={RouterLink}
              display={"flex"}
              alignItems={"center"}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              p={2}
              w={{ base: 10, md: "full" }}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <BiLogOut size={25} />
              <Box display={{ base: "none", md: "block" }}>Log Out</Box>
            </Link>
          </Tooltip>
        </Flex>
      </Box>
    </>
  );
};

export default SideBar;
