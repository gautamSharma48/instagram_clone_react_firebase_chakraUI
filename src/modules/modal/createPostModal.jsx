import {
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/profilePage/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import useCreatePost from "../../hooks/post/useCreatePost";
import useShowToast from "../../hooks/useShowToast";

const CreatePostModal = ({ isOpen, onClose }) => {
  const showToast = useShowToast();
  const imageRef = useRef(null);
  const [caption, setCaption] = useState("");
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = () => {
    try {
      handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"}>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Textarea
            placeholder="Post caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <Input
            type="file"
            hidden
            ref={imageRef}
            onChange={handleImageChange}
          />

          <BsFillImageFill
            onClick={() => imageRef.current.click()}
            style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
            size={16}
          />
          {selectedFile && (
            <Flex
              mt={5}
              w={"full"}
              position={"relative"}
              justifyContent={"center"}
            >
              <Image src={selectedFile} alt="Selected img" />
              <CloseButton
                position={"absolute"}
                top={2}
                right={2}
                onClick={() => {
                  setSelectedFile(null);
                }}
              />
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
