import { useState } from "react";
import useShowToast from "../useShowToast";
import useAuthStore from "../../store/authStore";
import FireBase from "../../services/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../../store/userProfileStore";

const useEditProfile = () => {
  const firebase = new FireBase();
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const editProfile = async (inputs) => {
    if (isUpdating || !authUser) return;

    setIsUpdating(true);
    const storageRef = ref(firebase.storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firebase.fireStore, "users", authUser.uid);

    let url = "";
    try {
      if (inputs.selectedFile) {
        await uploadString(storageRef, inputs.selectedFile, "data_url");
        url = await getDownloadURL(storageRef);
      }
      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePictureURL: url || authUser.profilePictureURL
      };
      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "User updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
      setIsUpdating(false);
    }
  };
  return { editProfile, isUpdating };
};

export default useEditProfile;
