import React, { useContext } from "react";
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
import { Badge } from "antd";
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
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/products");
    setIsMenuOpen(false); // Close menu after logout
  };

  const mobileMenuItems = [
    ...(user?.isLogin
      ? [
          {
            name: "Logout",
            action: handleLogout,
            isDanger: true,
            icon: "🚪",
          },
        ]
      : [
          {
            name: "Sign In",
            to: "/signin",
            icon: "🔑",
          },
          {
            name: "Sign Up",
            to: "/signup",
            isHighlighted: true,
            icon: "✍️",
          },
        ]),
    {
      name: "Products",
      to: "/products",
      icon: "🛍️",
    },
    {
      name: "Cart",
      to: "/cart",
      icon: "🛒",
    },
    {
      name: "Checkout",
      to: "/checkout",
      icon: "💳",
    }
  ];

  const navItems = [
    { name: "Products", to: "/products" },
    { name: "Cart", to: "/cart" },
    { name: "Checkout", to: "/checkout" },
  ];

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
          <NavbarItem key={item.name}>
            <Link
              to={item.to}
              className={`
                text-white/90 hover:text-white 
                transition-all duration-300
                relative
                after:content-[''] after:absolute after:bottom-0 after:left-0 
                after:w-0 after:h-0.5 after:bg-white
                after:transition-all after:duration-300
                hover:after:w-full
                ${window.location.pathname === item.to ? "after:w-full" : ""}
                px-2 py-1
              `}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Cart Icon - Visible on all devices */}
      <NavbarContent justify="end">
        {/* Mobile cart icon */}
        <NavbarItem className="sm:hidden flex">
          <Link to={"/cart"}>
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined style={{ fontSize: '28px', color: "white" }} />
            </Badge>
          </Link>
        </NavbarItem>

        {/* Desktop cart icon and auth buttons */}
        <NavbarItem className="hidden sm:flex items-center gap-4">
          <Link to={"/cart"}>
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined style={{ fontSize: '28px', color: "white" }} />
            </Badge>
          </Link>

          {user?.isLogin ? (
            <Button 
              onClick={handleLogout}
              className="text-sm"
            >
              LOGOUT
            </Button>
          ) : (
            <>
              <Link
                to={"/signin"}
                className={`
                  text-white/90 hover:text-white 
                  px-3 py-1 rounded-full
                  transition-all duration-300
                  hover:bg-white/10
                  border border-transparent
                  hover:border-white/20
                  text-sm
                `}
              >
                Sign In
              </Link>
              <Button
                as={Link}
                to={'/signup'}
                variant="solid"
                className={`
                  bg-gradient-to-r from-amber-400 to-amber-500
                  hover:from-amber-500 hover:to-amber-600
                  text-white font-medium rounded-full
                  px-4 py-1 shadow-md hover:shadow-lg
                  transform hover:scale-105 active:scale-95
                  transition-all duration-300
                  text-sm
                `}
              >
                Sign Up
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu with auth options */}
      <NavbarMenu className="bg-gradient-to-b from-amber-400 to-amber-500">
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            {item.to ? (
              <Link
                to={item.to}
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
                  ${window.location.pathname === item.to ? "bg-white/10" : ""}
                  transform hover:translate-x-2
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            ) : (
              <button
                onClick={item.action}
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
                  text-left
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </button>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}