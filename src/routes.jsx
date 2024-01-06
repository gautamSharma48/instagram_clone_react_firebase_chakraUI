import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage, Home, Profile } from "./modules";
import PageLayout from "./common/pageLayout";

/**
 * Renders the router component.
 *
 * @return {JSX.Element} The router component.
 */
const Router = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="*" element={<Navigate to={"/auth"} replace />} />
      </Routes>
    </PageLayout>
  );
};

export default Router;
