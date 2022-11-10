import { Link, useLocation } from "react-router-dom"
import { useAuth } from "./auth_context"

const Footer = () => {
  const selected = useLocation().pathname
  const { saveToken } = useAuth()

  const handleLogOut = () => {
    saveToken(null)
  }

  return (
    <footer className="w-full py-4 px-8 text-center border-t-4 bg-background border-primary-default text-white">
      <nav className="flex justify-between sm:justify-center sm:space-x-10">
        <NavLink selected={selected} href="/">
          Home
        </NavLink>
        <NavLink selected={selected} href="/menu">
          Cardápio
        </NavLink>
        <NavLink selected={selected} href="/payments">
          Pagamentos
        </NavLink>
        <NavLink selected={selected} href="/meal_types">
          Refeição
        </NavLink>
        <NavLink selected={selected} href="/register_employee">
          Funcionário
        </NavLink>
        <button onClick={handleLogOut}>Log out</button>
      </nav>
    </footer>
  )
}

interface NavLinkProps {
  selected: string | null
  href: string
  children: React.ReactNode
}

const NavLink = ({ selected, href, children }: NavLinkProps) => {
  const selectedSeg = selected !== null ? selected : ""
  const active = selectedSeg === href

  return (
    <Link to={href} className={active ? "underline" : ""}>
      {children}
    </Link>
  )
}

export default Footer
