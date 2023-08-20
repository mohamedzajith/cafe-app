import { useRoutes } from "react-router-dom";
import { PrivateRoutes } from "./routes/privateRoute";
const App = () => {
  return useRoutes(PrivateRoutes);
};

export default App;
