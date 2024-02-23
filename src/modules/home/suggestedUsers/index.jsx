import { Box, Flex, Link, Spinner, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./suggestedHeader";
import Users from "./users";
import useSuggestedUsers from "../../../hooks/home/useSuggestedUsers";

const SuggestedUsers = () => {
  const { isLoading, suggestedUser } = useSuggestedUsers();
  if (isLoading)
    return (
      <Box w={"full"} display={"flex"} justifyContent={"center"} py={10}>
        <Spinner />
      </Box>
    );

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"}>
        {suggestedUser.length !== 0 && (
          <>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
              Suggested For You
            </Text>
            <Text
              fontSize={12}
              fontWeight={"bold"}
              _hover={{ color: "gray.500" }}
            >
              See All
            </Text>
          </>
        )}
      </Flex>
      {suggestedUser.map((user, index) => (
        <Users key={index} user={user} />
      ))}
      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        @ {new Date().getFullYear()} Built By{" "}
        <Link
          href="https://github.com/gautamSharma48?tab=repositories"
          target="_blank"
          color="white"
          fontSize={14}
        >
          Gautam Sharma
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
