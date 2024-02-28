import {
  Avatar,
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text
} from "@chakra-ui/react";
import Utility from "../../../utils/utils";
import { Link } from "react-router-dom";
import useFollowUser from "../../../hooks/profilePage/useFollowUser";

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
    post.createdBy
  );
  return (
    <Flex
      my={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
    >
      <Flex alignItems={"center"} gap={2}>
        <Flex fontSize={12} fontWeight={"bold"} gap={"2"}>
          {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>
              <Avatar
                size={"sm"}
                src={creatorProfile?.profilePictureURL}
                alt="profile"
              />
            </Link>
          ) : (
            <SkeletonCircle size={"10"} />
          )}

          <Flex fontSize={12} fontWeight={"bold"} gap="2">
            {creatorProfile ? (
              <Link to={`/${creatorProfile.username}`}>
                {creatorProfile.username}
              </Link>
            ) : (
              <Skeleton w={"100px"} h={"10px"} />
            )}
            <Box color="gray.500">• {Utility.timesago(post.createdAt)}</Box>
          </Flex>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Text
          transition={"0.2 ease-in-out"}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{
            color: "white"
          }}
          onClick={handleFollowUser}
          isLoading={isUpdating}
          size={"xs"}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;
