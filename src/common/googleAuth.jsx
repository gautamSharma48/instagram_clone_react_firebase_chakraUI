import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import FireBase from "../services/firebase";
import useShowToast from "../hooks/useShowToast";
import useAuthStore from "../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { history } from "../manager/history";

const GoogleAuth = ({ prefix }) => {
  const firebase = new FireBase();
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const [signInWithGoogle, , error] = useSignInWithGoogle(firebase.auth);

  const handleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        return showToast("Error", error.message, "error");
      }

      const userRef = doc(firebase.fireStore, "users", newUser?.user?.uid);
      const usersnap = await getDoc(userRef);
      if (usersnap.exists()) {
        // User already exists so just log them in
        const userDoc = usersnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        history.push("/");
      } else {
        // sign-up user
        if (newUser) {
          const userDoc = {
            uid: newUser.user.uid,
            email: newUser.user.email,
            username: newUser.user.email.split("@")[0],
            fullName: newUser.user.email.split("@")[0],
            bio: "",
            profilePictureURL: newUser.user.photoURL,
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
          history.push("/");
        }
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleAuth}
    >
      <Image w={5} src="/images/google.png" alt="google logo" />
      <Text mx={2} color={"blue.500"}>
        {prefix + " with google"}
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
