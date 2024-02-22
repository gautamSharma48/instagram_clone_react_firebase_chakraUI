import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./login";
import SignUp from "./signUp";
import GoogleAuth from "./googleAuth";

const AuthForm = () => {
  const [isLogin, setLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/images/logo.png" alt="logo" />
          {isLogin ? <Login /> : <SignUp />}
          {/* OR text */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>
          <GoogleAuth prefix={isLogin ? "Login" : "Sign up"} />
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account" : "Already have an account?"}
          </Box>
          <Box
            cursor={"pointer"}
            color={"blue.500"}
            onClick={() => setLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
