import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";

const FeedPost = (props) => {
  const userData = props?.userData;
  return (
    <>
      <PostHeader userData={userData} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={userData?.img} alt="user profile pic" />
      </Box>
      <PostFooter userData={userData} />
    </>
  );
};

export default FeedPost;
