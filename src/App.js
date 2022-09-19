import RouterApp from "./routes/routes";
import "./global/GlobalStyle.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/Provider";

function App() {
  return (
      <GlobalProvider>
        <RouterApp />
      </GlobalProvider>
  );
}

export default App;
