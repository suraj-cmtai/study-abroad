"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail
} from "lucide-react"

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Events", href: "/events" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold"
              >
                StudyAbroad
              </motion.span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Helping students achieve their dreams of studying abroad through expert guidance and support.
            </p>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Subscribe to our newsletter</h3>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[200px]"
              />
              <Button>Subscribe</Button>
            </div>
            <div className="flex space-x-4 mt-4">
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2025 StudyAbroad. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="/contact" className="text-xs text-muted-foreground hover:text-primary flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              contact@studyabroad.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}