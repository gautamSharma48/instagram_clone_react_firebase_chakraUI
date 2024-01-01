import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const PostHeader = ({ userData }) => {
  return (
    <Flex
      my={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar size={"sm"} src={userData?.img} alt="profile" />
        <Flex fontSize={12} fontWeight={"bold"} gap={"2"}>
          {userData?.userName}
          <Box color="gray.500">• 1W</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Text
          transition={"0.2 ease-in-out"}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{
            color: "white",
          }}
        >
          Unfollow
        </Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;
