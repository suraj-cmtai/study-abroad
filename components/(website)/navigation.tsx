"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Courses", href: "/courses" },
  { name: "Gallery", href: "/gallery" },
  { name: "Test", href: "/test" },
  { name: "Profile", href: "/profile" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-navy" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-navy">STUDY</span>
                <span className="text-sm font-medium text-orange -mt-1">ABROAD</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-navy transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>            <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[400px] border-l border-gray-100 p-0"
              >
                {/* Logo and Header */}
                <div className="px-6 py-6 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-8 w-8 text-navy" />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-navy">STUDY</span>
                      <span className="text-sm font-medium text-orange -mt-1">ABROAD</span>
                    </div>
                  </div>
                  <SheetTitle className="text-navy mt-6 text-xl hidden">Navigation Menu</SheetTitle>
                  <SheetDescription className="text-gray-600 mt-2 hidden">
                    Explore our services and resources
                  </SheetDescription>
                </div>

                {/* Navigation Links */}
                <div className="px-4 py-6">
                  <div className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="px-4 py-3 rounded-lg text-gray-700 hover:text-navy hover:bg-gray-50/80 active:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-base font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                  <Button 
                    className="w-full bg-orange hover:bg-orange/90 text-white font-medium py-6"
                    onClick={() => window.location.href = '/login'}
                  >
                    Get Started
                  </Button>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
