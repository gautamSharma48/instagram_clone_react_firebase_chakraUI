import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import useLogOut from "../../../hooks/useLogOut";
import useAuthStore from "../../../store/authStore";
import { Link } from "react-router-dom";
const SuggestedHeader = () => {
  const { handleLogOut, isLoggingOut } = useLogOut();
  const authUser = useAuthStore((state) => state.user);

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser?.username}`}>
          <Avatar size={"lg"} src={authUser?.profilePictureURL} />
        </Link>
        <Link to={`${authUser?.username}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser?.username}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"xs"}
        background={"transparent"}
        _hover={{ background: "transparent" }}
        onClick={handleLogOut}
        isLoading={isLoggingOut}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
      >
        Log Out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
