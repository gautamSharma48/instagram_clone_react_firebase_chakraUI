import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Firebase from "../../services/firebase";
import useAuthStore from "../../store/authStore";
import useShowToast from "../useShowToast";
import useUserProfileStore from "../../store/userProfileStore";
import usePostStore from "../../store/postStore";

const useGetFeedPosts = () => {
  const firebase = new Firebase();
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);

      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      const q = query(
        collection(firebase.fireStore, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile, firebase.fireStore]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
