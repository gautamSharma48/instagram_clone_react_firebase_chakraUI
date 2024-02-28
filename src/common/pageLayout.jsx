import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SideBar from "./sidebar";
import { useEffect } from "react";
import { history } from "../manager/history";
import useAuthStore from "../store/authStore";

const PageLayout = ({ children }) => {
  const authUser = useAuthStore((state) => state.user);
  const { pathname } = useLocation();
  const canRenderSideBar = pathname !== "/auth";

  useEffect(() => {
    if (authUser?.uid) {
      return history.push("/");
    }
  }, [authUser?.uid]);
  return (
    <Flex>
      {/* sidebar on the left */}
      {canRenderSideBar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      ) : null}

      {/* the page content on the right */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
