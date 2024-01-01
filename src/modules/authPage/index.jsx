import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../common/authForm";

/**
 * Render the AuthPage component.
 *
 * @return {JSX.Element} The rendered AuthPage component.
 */
const AuthPage = () => {
  return (
    <Flex px={4} minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Container maxWidth={"container.md"} padding={0}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          {/* left hand side */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/images/auth.png" alt="phone img" />
          </Box>
          {/* right hand side */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>
              <Flex gap={5} justifyContent={"center"}>
                <Image
                  src="/images/playstore.png"
                  h={"10"}
                  alt="playstore logo"
                />
                <Image
                  src="/images/microsoft.png"
                  h={"10"}
                  alt="microsoft logo"
                />
              </Flex>
            </Box>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
