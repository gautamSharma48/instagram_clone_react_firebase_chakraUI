import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import useShowToast from "../useShowToast";
import useUserProfileStore from "../../store/userProfileStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import FireBase from "../../services/firebase";

const useFollowUser = (userId) => {
  const firebase = new FireBase();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firebase.fireStore, "users", authUser.uid);
      const userFollowOrUnfollowRef = doc(firebase.fireStore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
      });

      await updateDoc(userFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid)
      });

      if (isFollowing) {
        //unFollow
        const authUserPayload = {
          ...authUser,
          following: authUser.following.filter((id) => id !== userId)
        };
        setAuthUser(authUserPayload);
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((id) => id !== userId)
          });
        }

        localStorage.setItem("user-info", JSON.stringify(authUserPayload));
        showToast("Success", "Unfollowed successfully", "success");
        setIsFollowing(false);
      } else {
        // follow
        const authUserPayload = {
          ...authUser,
          following: [...authUser.following, userId]
        };
        setAuthUser(authUserPayload);
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid]
          });
        }

        localStorage.setItem("user-info", JSON.stringify(authUserPayload));
        showToast("Success", "followed successfully", "success");
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [userId, authUser]);

  return { isUpdating, handleFollowUser, isFollowing };
};

export default useFollowUser;
