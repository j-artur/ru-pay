import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./components/auth_context"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MealTypes from "./pages/MealTypes"
import Menu from "./pages/Menu"
import Payments from "./pages/Payments"
import RegisterEmployee from "./pages/RegisterEmployee"
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
          <Route path="/menu" element={<Menu />} />
          <Route path="/register_employee" element={<RegisterEmployee />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
