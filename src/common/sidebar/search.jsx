import { SearchLogo } from "../constants";
import { Box, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
import SearchUserModal from "../../modules/modal/searchUserModal";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>
      {isOpen && <SearchUserModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Search;
