import { useEffect, useState } from "react";
import useShowToast from "../useShowToast";
import useUserProfileStore from "../../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import FireBase from "../../services/firebase";

const useGetUserPost = () => {
  const firebase = new FireBase();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setLoading(true);
      setPosts([]);
      try {
        const q = query(
          collection(firebase.fireStore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const queryPosts = await getDocs(q);
        queryPosts.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [firebase.fireStore, posts, setPosts, showToast, userProfile]);

  return { loading, posts };
};

export default useGetUserPost;
