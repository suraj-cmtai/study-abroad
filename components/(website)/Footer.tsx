import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-navy text-white">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange">Study Abroad</h3>
            <p className="text-gray-300 text-sm">
              Your gateway to global education. Discover world-class opportunities and transform your future.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-orange cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-orange cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-orange cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-orange cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/courses" className="block text-gray-300 hover:text-orange transition-colors">
                Courses
              </Link>
              <Link href="/blogs" className="block text-gray-300 hover:text-orange transition-colors">
                Blogs
              </Link>
              <Link href="/gallery" className="block text-gray-300 hover:text-orange transition-colors">
                Gallery
              </Link>
              <Link href="/test" className="block text-gray-300 hover:text-orange transition-colors">
                Test
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Certificate Programs</p>
              <p className="text-gray-300">Diploma Courses</p>
              <p className="text-gray-300">Bachelor Degrees</p>
              <p className="text-gray-300">Master Programs</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange" />
                <span className="text-gray-300 text-sm">info@studyabroadind.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange" />
                <span className="text-gray-300 text-sm">+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange" />
                <span className="text-gray-300 text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">© 2024 Study Abroad by ValueAdz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
