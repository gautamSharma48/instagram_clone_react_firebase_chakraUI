import { useState } from "react";
import FireBase from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import useShowToast from "../useShowToast";

const useSearchUser = () => {
  const firebase = new FireBase();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(
        collection(firebase.fireStore, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast("Error", "User not found", "error");
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, user, getUserProfile, setUser };
};

export default useSearchUser;
