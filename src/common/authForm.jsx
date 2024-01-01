import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { history } from "../manager/history";

const AuthForm = () => {
  const [isLogin, setLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateState = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleAuth = () => {
    if (!inputs.email || !inputs.email) {
      alert("Please fill all the fields");
      return;
    }
    history.push("/");
  };
  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/images/logo.png" alt="logo" />
          <Input
            onChange={(event) => updateState("email", event.target.value)}
            placeholder="Email"
            fontSize={"14"}
          />
          <Input
            onChange={(event) => updateState("password", event.target.value)}
            placeholder="Password"
            fontSize={"14"}
          />
          {!isLogin ? (
            <Input
              placeholder="Confirm Password"
              fontSize={14}
              type="password"
              onChange={(event) =>
                updateState("confirmPassword", event.target.value)
              }
            />
          ) : null}
          <Button
            onClick={handleAuth}
            w={"full"}
            colorScheme="blue"
            fontSize={14}
          >
            {isLogin ? "Log in" : "Sign Up"}{" "}
          </Button>
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
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <Image w={5} src="/images/google.png" alt="google logo" />
            <Text mx={2} color={"blue.500"}>
              Log in with google
            </Text>
          </Flex>
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
