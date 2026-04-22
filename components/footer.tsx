"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">TroyTech Solutions</h2>

            <p className="text-sm text-white/80 dark:text-gray-400">
              Building modern digital products, scalable platforms and powerful
              web applications for businesses worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <Link
                href="https://x.com/Ikodit2002"
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                <Twitter size={18} />
              </Link>

              <Link
                href="https://www.instagram.com/ikoditbenjami/"
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                <Instagram size={18} />
              </Link>

              <Link
                href="https://www.linkedin.com/in/ikodit-benjamin-197365350/"
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                <Linkedin size={18} />
              </Link>

              <Link
                href="https://www.youtube.com/channel/UCBHBnSol61cCFGzWn8lXshQ"
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                <Youtube size={18} />
              </Link>

              <Link
                href="https://www.facebook.com/profile.php?id=100090950210061"
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                <Facebook size={18} />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>

            <p className="text-sm text-white/80 dark:text-gray-400">
              techtroy28@gmail.com
            </p>

            <p className="text-sm text-white/80 dark:text-gray-400">
              +256 747 447 447
            </p>

            <p className="text-sm text-white/80 dark:text-gray-400">
              Kampala, Uganda
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>

            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-white">
                Home
              </Link>

              <Link href="/about" className="hover:text-white">
                About
              </Link>

              <Link href="/projects" className="hover:text-white">
                Projects
              </Link>

              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Newsletter</h3>

            <p className="text-sm text-white/80">
              Subscribe to get updates about our products.
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="Enter email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />

              <Button className="bg-white text-indigo-600 hover:bg-gray-200">
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-6 text-sm text-white/70">
        © 2026 TroyTech Solutions. All rights reserved.
      </div>
    </footer>
  );
}
