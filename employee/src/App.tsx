import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./components/auth_context"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MealTypes from "./pages/MealTypes"
import RegisterMeal from "./pages/RegisterMeal"
import RegisterMealType from "./pages/RegisterMealType"
import "./styles/globals.css"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meal_types" element={<MealTypes />} />
          <Route path="/register_meal_type" element={<RegisterMealType />} />
          <Route path="/register_meal" element={<RegisterMeal />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
