import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import FireBase from "../services/firebase";
import useAuthStore from "../store/authStore";
import { history } from "../manager/history";

const useLogOut = () => {
  const firebase = new FireBase();
  const showToast = useShowToast();
  const [signOut, loading, error] = useSignOut(firebase.auth);
  const logoutUser = useAuthStore((state) => state.logOut);

  const handleLogOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
      history.push("/auth");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { handleLogOut, loading, error };
};

export default useLogOut;
