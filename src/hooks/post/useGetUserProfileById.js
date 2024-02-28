import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import FireBase from "../../services/firebase";
import useShowToast from "../useShowToast";

const useGetUserProfileById = (userId) => {
  const firebase = new FireBase();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firebase.fireStore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, setUserProfile, userId, firebase.fireStore]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
