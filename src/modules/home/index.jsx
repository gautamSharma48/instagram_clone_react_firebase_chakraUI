import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "./feedPosts";
import SuggestedUsers from "./suggestedUsers";
import { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import { history } from "../../manager/history";

const Home = () => {
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!authUser) return history.push("/auth");
  }, [authUser]);
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>
        <Box
          flex={3}
          mr={2}
          maxW={"300px"}
          display={{ base: "none", lg: "block" }}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
