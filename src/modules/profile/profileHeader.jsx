import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfileModal from "../modal/editProfileModal";
import useFollowUser from "../../hooks/profilePage/useFollowUser";

const ProfileHeader = () => {
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile } = useUserProfileStore();
  const { isUpdating, handleFollowUser, isFollowing } = useFollowUser(
    userProfile.uid
  );
  const checkOwnerUser = authUser && authUser.username === userProfile.username;
  const visitingAnotherProfile =
    authUser && authUser.username !== userProfile.username;

  return (
    <Flex gap={{ base: 4, sm: 10 }} direction={{ base: "column", sm: "row" }}>
      <AvatarGroup
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        size={{ base: "xl", md: "2xl" }}
      >
        <Avatar src={userProfile?.profilePictureURL} alt="profile pic" />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile?.username}
          </Text>
          {checkOwnerUser && (
            <Flex
              onClick={onOpen}
              gap={4}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
              >
                Edit Profile
              </Button>
            </Flex>
          )}
          {visitingAnotherProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.600" }}
                size={{ base: "xs", md: "sm" }}
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.posts?.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile?.fullName}
          </Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile?.bio}</Text>
      </VStack>
      {isOpen && <EditProfileModal onClose={onClose} isOpen={isOpen} />}
    </Flex>
  );
};

export default ProfileHeader;
