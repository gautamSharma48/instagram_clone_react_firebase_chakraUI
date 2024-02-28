import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../hooks/post/useGetUserProfileById";
import { Link } from "react-router-dom";
import Utility from "../utils/utils";

const Comment = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
  console.log(userProfile);

  if (isLoading && !userProfile) return <CommentSkeleton />;
  return (
    <Flex gap={4}>
      <Link to={`/${userProfile?.username}`}>
        <Avatar src={userProfile?.profilePictureURL} size={"sm"}></Avatar>
      </Link>

      <Flex direction={"column"} justifyContent={"start"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={"12"}>
            {userProfile?.username}
          </Text>
        </Flex>
        <Text fontSize={14}>{comment?.comment}</Text>
        <Text fontSize={12} color={"gray"}>
          {Utility.timesago(userProfile?.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w="10" />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};

export default Comment;
