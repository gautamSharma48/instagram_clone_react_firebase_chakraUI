import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
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
        value={inputs.password}
      />
      <Button onClick={handleAuth} w={"full"} colorScheme="blue" fontSize={14}>
        Log in
      </Button>
    </>
  );
};

export default Login;
