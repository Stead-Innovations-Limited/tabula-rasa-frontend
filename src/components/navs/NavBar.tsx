import Link from "next/link"
import { Button } from "../ui/button"

function NavBar() {
  return (
    <header className="flex items-center justify-center">
        <h1 className="">
            Tabula Rasa
        </h1>
        <nav className="flex items-center">
            <Link href="">About</Link>
            <Link href="">Offerings</Link>
            <Link href="">Contact</Link>
        </nav>
        <div className="">
            <Button>
              Log In
            </Button>
        </div>
    </header>
  )
}

export default NavBar