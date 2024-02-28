import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";
import useGetUserProfileById from "../../../hooks/post/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post?.imageURL} alt="user profile pic" />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
};

export default FeedPost;
