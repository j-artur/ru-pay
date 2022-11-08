import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./components/auth_context"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RegisterMeal from "./pages/RegisterMeal"
import "./styles/globals.css"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register_meal" element={<RegisterMeal />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
