import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { useRef } from "react";
import useSearchUser from "../../hooks/sidebar/useSearchUser";
import Users from "../home/suggestedUsers/users";

const SearchUserModal = ({ isOpen, onClose }) => {
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();
  const searchRef = useRef(null);

  const handleSearchUser = (event) => {
    event.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Search user</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSearchUser}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="asaprogrammer" ref={searchRef} />
            </FormControl>

            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isLoading}
              >
                Search
              </Button>
            </Flex>
          </form>
          {user && <Users user={user} setUser={setUser} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchUserModal;
