import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./feedPost";
import { useEffect, useState } from "react";

const FeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const data = [
    {
      userName: "Gautam Sharma",
      img: "/images/img1.png",
    },
    {
      userName: "Eve",
      img: "/images/img2.png",
    },
    {
      userName: "john",
      img: "/images/img3.png",
    },
    {
      userName: "Gauti",
      img: "/images/img4.png",
    },
  ];
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [...Array(data.length)].map((_, index) => (
          <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton w={"200px"} h={"10px"} />
                <Skeleton w={"200px"} h={"10px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"} h={"500px"} />
          </VStack>
        ))}
      {!isLoading && (
        <>
          {data.map((element, index) => (
            <FeedPost key={index} userData={element} />
          ))}
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
