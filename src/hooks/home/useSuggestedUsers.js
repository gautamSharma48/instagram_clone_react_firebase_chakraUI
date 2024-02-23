import { useEffect, useState } from "react";
import FireBase from "../../services/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from "firebase/firestore";
import useShowToast from "../useShowToast";
import useAuthStore from "../../store/authStore";

const useSuggestedUsers = () => {
  const firebase = new FireBase();
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUser, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const getSuggestedUser = async () => {
      setIsLoading(true);
      try {
        const userRef = collection(firebase.fireStore, "users");
        const q = query(
          userRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3)
        );

        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setSuggestedUsers(users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getSuggestedUser();
  }, [authUser, firebase.fireStore, showToast]);

  return { isLoading, suggestedUser };
};

export default useSuggestedUsers;
