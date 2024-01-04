import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./suggestedHeader";
import Users from "./users";

const SuggestedUsers = () => {
  const data = [
    {
      userName: "Gautam Sharma",
      img: "/images/img1.png",
      followers: 1392
    },
    {
      userName: "Eve",
      img: "/images/img2.png",
      followers: 1392
    },
    {
      userName: "john",
      img: "/images/img3.png",
      followers: 1392
    },
    {
      userName: "Gauti",
      img: "/images/img4.png",
      followers: 1392
    }
  ];
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested For You
        </Text>
        <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.500" }}>
          See All
        </Text>
      </Flex>
      {data.map((element, index) => (
        <Users key={index} userData={element} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        @ 2023 Built By{" "}
        <Link
          href="https://github.com/gautamSharma48?tab=repositories"
          target="_blank"
          color="blue.500"
          fontSize={14}
        >
          Gautam Sharma
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
