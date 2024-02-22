import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import FireBase from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { history } from "../manager/history";

const useLogin = () => {
  const firebase = new FireBase();
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(firebase.auth);

  const handleLogin = async (inputs) => {
    try {
      if (!inputs.email || !inputs.password) {
        return showToast("Error", "Please fill all the fields", "error");
      }
      const userAuth = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!userAuth || userAuth === undefined) {
        return showToast("Error", "Incorrect username or password", "error");
      }
      if (userAuth) {
        const docRef = doc(firebase.fireStore, "users", userAuth.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
        history.push("/");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { loading, handleLogin, error };
};

export default useLogin;
