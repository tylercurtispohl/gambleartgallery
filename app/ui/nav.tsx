"use client";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const linkClasses = "text-blue-900 text-lg font-serif underline-offset-4";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      maxWidth="xl"
      classNames={{
        wrapper: "px-4 md:px-6 xl:px-0",
      }}
    >
      <NavbarBrand>
        <p className="font-medium font-serif text-2xl text-blue-900">
          Kirsten Gamble
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="/" underline="active">
            <span
              className={clsx(linkClasses, {
                underline: pathname === "/",
              })}
            >
              Gallery
            </span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            <span
              className={clsx(linkClasses, {
                underline: pathname === "/about",
              })}
            >
              About
            </span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/events">
            <span
              className={clsx(linkClasses, {
                underline: pathname === "/events",
              })}
            >
              Events
            </span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact">
            <span
              className={clsx(linkClasses, {
                underline: pathname === "/contact",
              })}
            >
              Contact
            </span>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarMenu>
        <div className="flex justify-end">
          <div className="flex flex-col gap-3">
            <NavbarMenuItem>
              <Link color="foreground" href="/">
                <span
                  className={clsx(linkClasses, {
                    underline: pathname === "/",
                  })}
                >
                  Gallery
                </span>
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/about">
                <span
                  className={clsx(linkClasses, {
                    underline: pathname === "/about",
                  })}
                >
                  About
                </span>
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/events">
                <span
                  className={clsx(linkClasses, {
                    underline: pathname === "/events",
                  })}
                >
                  Events
                </span>
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/contact">
                <span
                  className={clsx(linkClasses, {
                    underline: pathname === "/contact",
                  })}
                >
                  Contact
                </span>
              </Link>
            </NavbarMenuItem>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
