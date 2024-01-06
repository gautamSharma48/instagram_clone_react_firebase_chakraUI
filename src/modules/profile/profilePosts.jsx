import {
  Image,
  Grid,
  GridItem,
  Text,
  Skeleton,
  VStack,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Avatar,
  Divider
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../../common/comment";
import PostFooter from "../home/feedPosts/postFooter";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={"4"}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
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

      <Modal
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              mx={"auto"}
              gap={4}
              w={{ bases: "90%", sm: "70%", md: "full" }}
            >
              <Box
                flex={1.5}
                border={"1px solid"}
                borderRadius={4}
                overflow={"hidden"}
                borderColor={"whiteAlpha.300"}
              >
                <Image src={img} alt="profile-post" />
              </Box>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src="/images/profilepic.png"
                      alt="profilePic"
                      size={"sm"}
                      name="gautam"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      Gautam
                    </Text>
                  </Flex>
                  <Box
                    borderRadius={4}
                    p={1}
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                  >
                    <MdDelete size={20} cursor={"pointer"} />
                  </Box>
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  <Comment
                    createdAt="1d agp"
                    userName="gautam"
                    profilcPic={"/images/profilepic.png"}
                    text={"Dummy texxt"}
                  />
                </VStack>
                <Divider my={4} bg={"gray.8001"} />
                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePosts;
