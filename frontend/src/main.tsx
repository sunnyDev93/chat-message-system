import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { MessageProvider } from "./contexts/MessageContext";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MessageProvider>
      <App />
    </MessageProvider>
    <ToastContainer position="top-right" autoClose={3000} aria-label="error-toast" />
  </ThemeProvider>
);