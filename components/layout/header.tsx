import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { HeaderSearchBar } from "./headerSearchBar"
import { Logo } from "../icons/logo"
import { SidebarTrigger } from "../ui/sidebar"

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-background/90 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="md:hidden">
          <Logo />
        </div>
        <HeaderSearchBar />
      </div>
      <div className="flex items-center gap-4">
        <Show when="signed-out">
          <SignInButton>
            <Button variant="ghost">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  )
}
