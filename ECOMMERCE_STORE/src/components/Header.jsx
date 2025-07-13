import React, { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { ShoppingCartOutlined } from "@mui/icons-material";
import {Badge} from "antd"
import { CartContext } from "../context/CartContext";



export const AcmeLogo = () => {
  return (
    <svg
      fill="none"
      height="36"
      viewBox="0 0 32 32"
      width="36"
      className="transition-transform duration-300 hover:scale-110"
    >
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
const navigate = useNavigate()
  const menuItems = [
    { name: "Profile", href: "#", icon: "👤" },
    { name: "Dashboard", href: "#", icon: "📊" },
    { name: "Activity", href: "#", isHighlighted: true, icon: "🔥" },
    { name: "Analytics", href: "#", icon: "📈" },
    { name: "System", href: "#", icon: "⚙️" },
    { name: "Deployments", href: "#", icon: "🚀" },
    { name: "My Settings", href: "#", icon: "🔧" },
    { name: "Team Settings", href: "#", icon: "👥" },
    { name: "Help & Feedback", href: "#", icon: "❓" },
    { name: "Log Out", href: "#", isDanger: true, icon: "🚪" },
  ];

  const navItems = [
    { name: "Features", href: "#" },
    { name: "Customers", href: "#", isActive: true },
    { name: "Integrations", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Docs", href: "#" },
  ];

  const {user, setUser} = useContext(AuthContext)
  console.log("user", user)

  const handleLogout = async ()=>{
    await signOut(auth)
    navigate("/products")
  }

  // const [cartItemCount, setCartItemCount] = useState("10")
  const {cartItems} = useContext(CartContext)


  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: "bg-[linear-gradient(to_right,_#7b1fa2,_#4527a0)] hover:bg-[linear-gradient(to_right,_#6a1b9a,_#3d1b92)] text-white shadow-md",
        wrapper: "px-4 max-w-7xl",
        item: "data-[active=true]:text-white data-[active=true]:font-semibold",
      }}
    >
      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white hover:scale-125 transition-transform"
        />
      </NavbarContent>

      {/* Mobile brand */}
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-white hover:text-yellow-100 transition-colors duration-300">
            Skyler
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop brand */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-white hover:text-yellow-100 transition-colors duration-300">
            Skyler
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Nav links */}
      <NavbarContent className="hidden sm:flex" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.name} isActive={item.isActive}>
            <Link
              className={`
                text-white/90 hover:text-white 
                transition-all duration-300
                relative
                after:content-[''] after:absolute after:bottom-0 after:left-0 
                after:w-0 after:h-0.5 after:bg-white
                after:transition-all after:duration-300
                hover:after:w-full
                ${item.isActive ? "after:w-full" : ""}
                px-2 py-1
              `}
              href={item.href}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Login & SignUp */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex justify-center items-center gap-10">
      <Link to={"/cart"}>
      <Badge count={cartItems.length} >
  <ShoppingCartOutlined style={{ fontSize: '37px', color: "white" }} />
</Badge>
      </Link>

         {
          user?.isLogin ? 
          (
            <Button 
            to={"logout"}
            className=""
            onClick={handleLogout}>
              LOGOUT
            </Button>
          ):
          (
             <Link
            to={"/signin"}
            className={`
              text-white/90 hover:text-white 
              px-3 py-1 rounded-full
              transition-all duration-300
              hover:bg-white/10
              border border-transparent
              hover:border-white/20
            `}
          >
            Sign In
          </Link>
          )
         }
        </NavbarItem>
        <NavbarItem>
          {
            user?.isLogin ?
            (
              null
            ):
            (
              <Button
            as={Link}
           to={'/signup'}
            variant="solid"
            className={`
              bg-gradient-to-r from-amber-400 to-amber-500
              hover:from-amber-500 hover:to-amber-600
              text-white font-medium rounded-full
              px-6 py-2 shadow-md hover:shadow-lg
              transform hover:scale-105 active:scale-95
              transition-all duration-300
            `}
          >
            Sign Up
          </Button>
            )
          }
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="bg-gradient-to-b from-amber-400 to-amber-500">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className={`
                w-full py-3 px-4 rounded-lg 
                transition-all duration-300
                flex items-center gap-3
                ${item.isHighlighted
                  ? "bg-white/20 text-white font-medium shadow-md hover:shadow-lg"
                  : item.isDanger
                    ? "text-red-400 hover:bg-red-500/20 hover:text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }
                transform hover:translate-x-2
              `}
              href={item.href}
              size="lg"
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
