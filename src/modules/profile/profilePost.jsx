import {
  Avatar,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import PostFooter from "../home/feedPosts/postFooter";
import Comment from "../../common/comment";
import { MdDelete } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import useUserProfileStore from "../../store/userProfileStore";
import usePostStore from "../../store/postStore";
import useAuthStore from "../../store/authStore";
import FireBase from "../../services/firebase";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Caption from "../../common/caption";

const ProfilePost = ({ post }) => {
  const firebase = new FireBase();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      const imageRef = ref(firebase.storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firebase.fireStore, "users", authUser.uid);
      await deleteDoc(doc(firebase.fireStore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id)
      });
      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  console.log(post);
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
                {post.likes.length}
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <FaComment />
              <Text fontWeight={"bold"} ml={"2"}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          height={"full"}
          width={"full"}
          objectFit={"cover"}
          src={post.imageURL}
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
                alignItems={"center"}
                display={"flex"}
              >
                <Image src={post.imageURL} alt="profile-post" />
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
                      {userProfile.username}
                    </Text>
                  </Flex>
                  <Box
                    borderRadius={4}
                    p={1}
                    _loading={isDeleting}
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                  >
                    <MdDelete
                      onClick={handleDeletePost}
                      size={20}
                      cursor={"pointer"}
                    />
                  </Box>
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {/* CAPTION */}
                  {post.caption && <Caption post={post} />}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.8001"} />
                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
