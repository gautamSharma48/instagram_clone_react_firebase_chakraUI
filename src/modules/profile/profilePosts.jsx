import { Grid, Skeleton, VStack } from "@chakra-ui/react";
import useGetUserPost from "../../hooks/post/useGetUserPost";
import NoPostFound from "../../common/noPostFound";
import ProfilePost from "./profilePost";

const ProfilePosts = () => {
  const { loading, posts } = useGetUserPost();
  const noPostFound = !loading && posts && posts?.length === 0;
  if (noPostFound) return <NoPostFound />;

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1 , 1fr)",
        md: "repeat(3, 1fr)"
      }}
      gap={1}
      columnGap={1}
    >
      {loading &&
        [...Array(3)].map((_, index) => (
          <VStack key={index}>
            <Skeleton w="full" h={"300px"}></Skeleton>
          </VStack>
        ))}

      {!loading &&
        posts?.map((post, index) => (
          <>
            <ProfilePost key={index} post={post} />
          </>
        ))}
    </Grid>
  );
};

export default ProfilePosts;
