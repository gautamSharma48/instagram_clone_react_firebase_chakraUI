import CreatePost from "./createPost";
import Home from "./home";
import Notifications from "./notifications";
import ProfileLink from "./profileLink";
import Search from "./search";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
