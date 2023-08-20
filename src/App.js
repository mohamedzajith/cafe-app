import { useRoutes } from "react-router-dom";
import { PrivateRoutes } from "./routes/privateRoute";
const App = () => {
  const compainRoute = PrivateRoutes.concat([]);

  return useRoutes(compainRoute);
};

export default App;
