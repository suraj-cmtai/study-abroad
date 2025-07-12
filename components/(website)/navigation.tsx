"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

// Add targetBlank property to navItems
const navItems = [
  { name: "Home", href: "/", targetBlank: false },
  { name: "Blogs", href: "/blogs", targetBlank: false },
  { name: "Courses", href: "/courses", targetBlank: false },
  { name: "Gallery", href: "/gallery", targetBlank: false },
  { name: "Contact", href: "/contact", targetBlank: false },
  { name: "Psychometric Test", href: "https://test.studyabroadind.com", targetBlank: true },
  // { name: "Login", href: "/login", targetBlank: false },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center h-full max-h-full overflow-hidden"
          >
            <Image
              src="/avatar.png"
              alt="Study Abroad Logo"
              width={160}
              height={40}
              priority
              className="h-auto max-h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    `group relative text-sm font-medium text-gray-700 hover:text-navy transition-colors flex flex-col items-center px-1` +
                    (isActive ? ' text-orange' : '')
                  }
                  {...(item.targetBlank
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.name}
                  <span
                    className={`
                      pointer-events-none absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-orange origin-left transform transition-transform duration-300
                      ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] border-l border-gray-100 p-0"
            >
              {/* Logo and Header */}
              <div className="px-6 py-6 border-b border-gray-100">
                <Link
                  href="/"
                  className="flex items-center h-full max-h-full overflow-hidden"
                >
                  <Image
                    src="/avatar.png"
                    alt="Study Abroad Logo"
                    width={160}
                    height={40}
                    priority
                    className="h-auto max-h-12 w-auto object-contain"
                  />
                </Link>

                <SheetTitle className="text-navy mt-6 text-xl hidden">
                  Navigation Menu
                </SheetTitle>
                <SheetDescription className="text-gray-600 mt-2 hidden">
                  Explore our services and resources
                </SheetDescription>
              </div>

              {/* Navigation Links */}
              <div className="px-4 py-6">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={
                          `group relative px-4 py-3 rounded-lg text-gray-700 hover:text-navy hover:bg-gray-50/80 active:bg-gray-100 transition-all duration-200 flex items-center space-x-2` +
                          (isActive ? ' text-orange' : '')
                        }
                        onClick={() => setIsOpen(false)}
                        {...(item.targetBlank
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <span className="text-base font-medium">{item.name}</span>
                        <span
                          className={`
                            pointer-events-none absolute left-4 right-4 -bottom-1 h-0.5 rounded-full bg-orange origin-left transform transition-transform duration-300
                            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                          `}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA */}
              {/* <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                <Button
                  className="w-full bg-orange hover:bg-orange/90 text-white font-medium py-6"
                  onClick={() => (window.location.href = "/login")}
                >
                  Get Started
                </Button>
              </div> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
