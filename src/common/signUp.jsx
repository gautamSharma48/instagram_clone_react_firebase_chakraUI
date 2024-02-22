import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: "",
    showConfirmPassword: "",
    fullName: ""
  });
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const updateState = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async () => {
    if (!inputs.username || !inputs.email) {
      alert("Please fill all the fields");
      return;
    }
    try {
      await signup(inputs);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Input
        onChange={(event) => updateState("email", event.target.value)}
        placeholder="Email"
        fontSize={"14"}
        value={inputs.email}
      />
      <Input
        onChange={(event) => updateState("username", event.target.value)}
        placeholder="Username"
        fontSize={"14"}
        value={inputs.username}
      />
      <Input
        onChange={(event) => updateState("fullName", event.target.value)}
        placeholder="Full name"
        fontSize={"14"}
        value={inputs.fullName}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          fontSize={14}
          value={inputs.password}
          type={inputs?.showPassword ? "text" : "password"}
          size={"sm"}
          onChange={(event) => updateState("password", event.target.value)}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => updateState("showPassword", !inputs.showPassword)}
          >
            {inputs?.showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup>
        <Input
          placeholder="Confirm Password"
          fontSize={14}
          type={inputs?.showConfirmPassword ? "text" : "password"}
          value={inputs.confirmPassword}
          onChange={(event) =>
            updateState("confirmPassword", event.target.value)
          }
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() =>
              updateState("showConfirmPassword", !inputs.showConfirmPassword)
            }
          >
            {inputs?.showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        isLoading={loading}
        onClick={handleAuth}
        w={"full"}
        colorScheme="blue"
        fontSize={14}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
