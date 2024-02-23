import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FireBase from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserProfileStore from "../../store/userProfileStore";

const useGetUserProfileByUserName = (username) => {
  const firebase = new FireBase();
  const { userProfile, setUserProfile } = useUserProfileStore();
  const [loading, setLoading] = useState();
  const showToast = useToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);

      try {
        const q = query(
          collection(firebase.fireStore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          return setUserProfile(null);
        }
        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserProfile(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [firebase.fireStore, setUserProfile, showToast, username]);

  return { loading, userProfile };
};

export default useGetUserProfileByUserName;
