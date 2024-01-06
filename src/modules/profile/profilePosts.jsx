import {
  Image,
  Grid,
  GridItem,
  Text,
  Skeleton,
  VStack,
  Flex
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

const ProfilePosts = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1 , 1fr)",
        md: "repeat(3, 1fr)"
      }}
      gap={1}
      columnGap={1}
    >
      {loading &&
        [...Array(4)].map((_, index) => (
          <VStack key={index}>
            <Skeleton w="full" h={"300px"}></Skeleton>
          </VStack>
        ))}

      {!loading && (
        <>
          <ProfilePost img="/images/img1.png" />
          <ProfilePost img="/images/img2.png" />
          <ProfilePost img="/images/img3.png" />
        </>
      )}
    </Grid>
  );
};

const ProfilePost = ({ img }) => {
  return (
    <GridItem
      cursor={"pointer"}
      borderRadius={"4"}
      overflow={"hidden"}
      border={"1px solid"}
      borderColor={"whiteAlpha.300"}
      position={"relative"}
      aspectRatio={1 / 1}
    >
      <Flex
        position={"absolute"}
        inset={0}
        bg={"blackAlpha.700"}
        transition={"all 0.3s ease"}
        zIndex={1}
        justifyContent={"center"}
        opacity={0}
        _hover={{ opacity: "1" }}
      >
        <Flex alignItems={"center"} justifyContent={"center"} gap={"10"}>
          <Flex alignItems={"center"}>
            <AiFillHeart />
            <Text fontWeight={"bold"} ml={"2"}>
              7
            </Text>
          </Flex>
          <Flex alignItems={"center"}>
            <FaComment />
            <Text fontWeight={"bold"} ml={"2"}>
              7
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Image
        height={"full"}
        width={"full"}
        objectFit={"cover"}
        src={img}
        alt={"profile-img"}
      ></Image>
    </GridItem>
  );
};

export default ProfilePosts;
