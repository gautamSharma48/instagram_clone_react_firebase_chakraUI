import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";

const Users = ({ userData }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar size={"md"} src={userData?.img} name={userData?.name} />
        <VStack spacing={2}>
          <Box fontSize={12} fontWeight={"bold"} alignSelf={"start"}>
            {userData?.userName}
          </Box>
          <Box fontSize={11} alignSelf={"start"} color={"gray.500"}>
            {userData?.followers} followers
          </Box>
        </VStack>
      </Flex>
      <Button
        fontSize={13}
        fontWeight={"medium"}
        color={"blue.400"}
        bg={"transparent"}
        p={0}
        h={"max-content"}
        cursor={"pointer"}
        _hover={{ color: "white" }}
        onClick={() => setIsFollowed(!isFollowed)}
      >
        {isFollowed ? "Unfollow" : "follow"}
      </Button>
    </Flex>
  );
};

export default Users;
