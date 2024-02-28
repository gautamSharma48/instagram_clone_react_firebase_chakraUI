import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../../hooks/profilePage/useFollowUser";
import useAuthStore from "../../../store/authStore";
import { Link } from "react-router-dom";

const Users = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower !== authUser.uid)
        : [...user.followers, authUser.uid]
    });
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`}>
          <Avatar size={"md"} src={user?.profilePictureURL} />
        </Link>
        <VStack spacing={2}>
          <Link
            style={{ textAlign: "start", width: "100%" }}
            to={`/${user.username}`}
          >
            <Box fontSize={12} fontWeight={"bold"} alignSelf={"start"}>
              {user?.username}
            </Box>
          </Link>
          <Box fontSize={11} alignSelf={"start"} color={"gray.500"}>
            {user?.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          fontWeight={"medium"}
          color={"blue.400"}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "follow"}
        </Button>
      )}
    </Flex>
  );
};

export default Users;
