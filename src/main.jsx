import ReactDOM from "react-dom/client";
import App from "./routes.jsx";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./manager/history.js";
import "./assets/styles/custom.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  /**
   * Returns an object containing the body styling for the global theme.
   *
   * @param {Object} props - The props object.
   * @return {Object} - The body styling object with the following properties:
   *   - `bg`: The background color, determined by the `mode` function.
   *   - `color`: The text color, determined by the `mode` function.
   */
  global: (props) => ({
    body: {
      bg: mode("gray-100", "#000")(props),
      color: mode("gray.800", "white.alpha.900")(props),
    },
  }),
};
// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

const WebApp = () => {
  return (
    <HistoryRouter history={history}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </HistoryRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<WebApp />);
export default WebApp;
