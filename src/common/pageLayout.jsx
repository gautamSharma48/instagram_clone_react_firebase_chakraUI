import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SideBar from "./sideBar";

/**
 * Renders the page layout component.
 *
 * @param {Object} children - The children components to render.
 * @return {JSX.Element} The rendered page layout.
 */
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  // const authUser = useAuthStore((state) => state.user);
  const canRenderSideBar = pathname !== "/auth";

  // useEffect(() => {
  //   if (pathname !== "/user/" + username) {
  //     if (authUser) return history.push("/");
  //     else if (!authUser) return history.push("/auth");
  //   }
  // }, [authUser, pathname, username]);

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
