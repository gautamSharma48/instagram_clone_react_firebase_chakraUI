import { Avatar, Flex, Text } from "@chakra-ui/react";

const Comment = (props) => {
  return (
    <Flex gap={4}>
      <Avatar src={props?.profilePic} size={"sm"} name="username"></Avatar>
      <Flex direction={"column"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={"12"}>
            {props?.userName}
          </Text>
          <Text fontSize={14}>{props?.createdAt}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {props?.createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
