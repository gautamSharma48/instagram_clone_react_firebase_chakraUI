import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage, Home } from "./modules";
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
        <Route path="*" element={<Navigate to={"/sign-in"} replace />} />
      </Routes>
    </PageLayout>
  );
};

export default Router;
