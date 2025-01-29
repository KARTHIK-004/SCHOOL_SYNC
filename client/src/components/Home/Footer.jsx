import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../ui/logo";
import { FooterLinks } from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12">
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
              Empowering education through innovative school management
              solutions.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile view */}
          <div className="w-full md:hidden space-y-6">
            {FooterLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-foreground mb-2 text-center">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name} className="text-center">
                      <Link
                        to={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {FooterLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} School Sync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
