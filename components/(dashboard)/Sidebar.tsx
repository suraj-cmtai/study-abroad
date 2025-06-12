"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Image, 
  LogOut, 
  MapPin, 
  Package, 
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ContactRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: null },
  { name: "Courses", href: "/dashboard/courses", icon: FileText, badge: null },
  { name: "Blogs", href: "/dashboard/blogs", icon: FileText, badge: "3" },
  { name: "Subscribers", href: "/dashboard/subscribers", icon: Users, badge: "12" },
  { name: "Gallery", href: "/dashboard/gallery", icon: Image, badge: null },
  { name: "Contact", href: "/dashboard/contact", icon: ContactRound, badge: null },
];

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const sidebarVariants = {
  open: { width: 280, transition: { duration: 0.3, ease: "easeInOut" } },
  collapsed: { width: 80, transition: { duration: 0.3, ease: "easeInOut" } }
};

const linkVariants = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } }
};

const textVariants = {
  hidden: { opacity: 0, width: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, width: "auto", transition: { duration: 0.3, delay: 0.1 } }
};

const Sidebar = ({ onClose, isMobile = false }: SidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const SidebarContent = () => (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed && !isMobile ? "collapsed" : "open"}
      className="flex flex-col h-full bg-background border-r"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <AnimatePresence mode="wait">
          {(!isCollapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <div>
                <h2 className="text-lg font-bold">Study Abroad</h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Collapse Toggle (Desktop only) */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="h-8 w-8"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        )}

        {/* Close Button (Mobile only) */}
        {isMobile && onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <TooltipProvider>
          {links.map((link, index) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            const LinkContent = (
              <motion.div
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors cursor-pointer group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted/50"
                )}
                onClick={handleLinkClick}
              >
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
                
                <AnimatePresence mode="wait">
                  {(!isCollapsed || isMobile) && (
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex items-center justify-between flex-1 min-w-0"
                    >
                      <span className="font-medium truncate">{link.name}</span>
                      {link.badge && (
                        <Badge 
                          variant={isActive ? "secondary" : "outline"}
                          className="ml-2 h-5 px-2 text-xs"
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );

            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {isCollapsed && !isMobile ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={link.href}>
                        {LinkContent}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center space-x-2">
                      <span>{link.name}</span>
                      {link.badge && (
                        <Badge variant="outline" className="h-5 px-2 text-xs">
                          {link.badge}
                        </Badge>
                      )}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link href={link.href}>
                    {LinkContent}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </TooltipProvider>
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        <TooltipProvider>
          {isCollapsed && !isMobile ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full h-12"
                  onClick={handleLinkClick}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>Logout</span>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3"
              onClick={handleLinkClick}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          )}
        </TooltipProvider>
      </div>
    </motion.div>
  );

  return <SidebarContent />;
};

export default Sidebar;