import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
