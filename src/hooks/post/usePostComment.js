import { useState } from "react";
import usePostStore from "../../store/postStore";
import useAuthStore from "../../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import FireBase from "../../services/firebase";
import useShowToast from "../useShowToast";

const usePostComment = () => {
  const firebase = new FireBase();
  const [isCommneting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment) => {
    if (isCommneting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to comment");
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId
    };
    try {
      await updateDoc(doc(firebase.fireStore, "posts", postId), {
        comments: arrayUnion(newComment)
      });
      addComment(postId, comment);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommneting, handlePostComment };
};

export default usePostComment;
