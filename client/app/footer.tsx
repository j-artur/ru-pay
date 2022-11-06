"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

const Footer = () => {
  const selected = useSelectedLayoutSegment()
  return (
    <>
      {selected !== "login" && (
        <footer className="fixed w-full bottom-0 py-4 px-8 text-center border-t-4 bg-background border-primary-default">
          <nav className="flex justify-between sm:justify-center sm:space-x-10">
            <NavLink selected={selected} href="/">
              Home
            </NavLink>
            <NavLink selected={selected} href="/pay">
              Pagar
            </NavLink>
            <NavLink selected={selected} href="/menu">
              Cardápio
            </NavLink>
            <NavLink selected={selected} href="/about">
              Sobre Nós
            </NavLink>
          </nav>
        </footer>
      )}
    </>
  )
}

interface NavLinkProps {
  selected: string | null
  href: string
  children: React.ReactNode
}

const NavLink = ({ selected, href, children }: NavLinkProps) => {
  const selectedSeg = selected !== null ? selected : ""
  const active = `/${selectedSeg}` === href

  return (
    <Link href={href} className={active ? "underline" : ""}>
      {children}
    </Link>
  )
}

export default Footer
