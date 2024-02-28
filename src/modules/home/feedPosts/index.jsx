import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack
} from "@chakra-ui/react";
import FeedPost from "./feedPost";
import useGetFeedPosts from "../../../hooks/post/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [...Array(3)].map((_, index) => (
          <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton w={"200px"} h={"10px"} />
                <Skeleton w={"200px"} h={"10px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"} h={"500px"} />
          </VStack>
        ))}
      {!isLoading && posts.length > 0 && (
        <>
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </>
      )}
      {!isLoading && posts.length === 0 && (
        <Flex direction={"column"}>
          <Text fontSize={"md"} color={"red.400"} textAlign={"center"}>
            Dayuum. Looks like you don&apos;t have any friends.
          </Text>
          <Text color={"red.400"} textAlign={"center"}>
            Stop coding and go make some!!
          </Text>
        </Flex>
      )}
    </Container>
  );
};

export default FeedPosts;
