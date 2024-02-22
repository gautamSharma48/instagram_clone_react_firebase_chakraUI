import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import FireBase from "../services/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
  const firebase = new FireBase();
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(firebase.auth);

  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.username ||
      !inputs.password ||
      !inputs.confirmPassword
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs?.password
      );

      const userRef = collection(firebase.fireStore, "users");
      const q = query(userRef, where("username", "==", inputs.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        showToast("Error", "Username already exists", "error");
        return;
      }

      if ((newUser === undefined && !newUser) || error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userDoc = {
        uid: newUser.user.uid,
        email: inputs.email,
        username: inputs.username,
        fullName: inputs.fullName,
        bio: "",
        profilePictureURL: "",
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now()
      };
      await setDoc(
        doc(firebase.fireStore, "users", newUser?.user?.uid),
        userDoc
      );
      localStorage.setItem("user-info", JSON.stringify(userDoc));
      loginUser(userDoc);
    } catch (err) {
      showToast("Error", error.message, "error");
    }
  };
  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
