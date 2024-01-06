import { Container, Flex } from "@chakra-ui/react";
import ProfileHeader from "./profileHeader";
import ProfileTabs from "./profileTabs";
import ProfilePost from "./profilePosts";

const Profile = () => {
  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex px={4} pl={{ base: 4, md: 10 }} py={10} flexDirection={"column"}>
        <ProfileHeader />
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePost />
      </Flex>
    </Container>
  );
};

export default Profile;
