import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import useLogin from "../hooks/login/useLogin";

const Login = () => {
  const showToast = useShowToast();
  const { loading, error, handleLogin } = useLogin();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const updateState = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async () => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }
    try {
      await handleLogin(inputs);
    } catch (error) {
      showToast("Error", error.message, "error");
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
        onChange={(event) => updateState("password", event.target.value)}
        placeholder="Password"
        fontSize={"14"}
        size={"sm"}
        value={inputs.password}
      />
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
        Log in
      </Button>
    </>
  );
};

export default Login;
