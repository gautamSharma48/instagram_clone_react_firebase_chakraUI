import { useState } from "react";
import useShowToast from "../useShowToast";
import { useLocation } from "react-router-dom";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import FireBase from "../../services/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import usePostStore from "../../store/postStore";

const useCreatePost = () => {
  const firebase = new FireBase();
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const { userProfile, addPost } = useUserProfileStore();
  const { pathname } = useLocation();
  const createPost = usePostStore((state) => state.createPost);

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an iamge");
    setIsLoading(true);

    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid
    };
    try {
      const postDocRef = await addDoc(
        collection(firebase.fireStore, "posts"),
        newPost
      );
      const userDocRef = doc(firebase.fireStore, "users", authUser.uid);
      const imageRef = ref(firebase.storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downLoadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downLoadURL });
      newPost.imageURL = downLoadURL;
      if (userProfile?.uid === authUser?.uid) {
        createPost({ ...newPost, id: postDocRef.id });
      }
      if (pathname !== "/" && userProfile?.uid === authUser?.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};

export default useCreatePost;
