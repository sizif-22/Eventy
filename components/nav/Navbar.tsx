'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User as UserIcon, Settings, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export const Navbar = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled
          ? 'backdrop-blur-md bg-background/80'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="font-cinzel text-sm tracking-[0.15em] text-foreground">
          EVNETY
        </Link>

        {/* Center: Nav Links */}
        {/* <div className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'Pricing'].map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-inter text-sm text-secondary hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          ))}
        </div> */}

        {/* Right: Buttons or User Profile */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              {/* <Link
                href="/console"
                className="bg-foreground text-background font-inter text-[13px] px-5 py-2 rounded-sm hover:bg-foreground/90 transition-colors"
              >
                Go to Console
              </Link> */}
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-9 w-9 rounded-xl  border border-secondary/20">
                    <AvatarImage src={user.profilePictureUrl || undefined} className='rounded-xl' />
                    <AvatarFallback className="bg-background-2 text-foreground text-xs rounded-xl">
                      {user.firstName?.charAt(0)}
                      {user.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-background-2 border-secondary/20 text-foreground"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-newsreader italic text-lg font-normal">
                      My Account
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-secondary/10" />

                  {/* <Link href="/account">
                    <DropdownMenuItem className="hover:bg-secondary/5 cursor-pointer focus:bg-secondary/5 focus:text-foreground">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link> */}
                  <Link href="/console">
                    <DropdownMenuItem className="hover:bg-secondary/5 cursor-pointer focus:bg-secondary/5 focus:text-foreground">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Console</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="bg-secondary/10" />
                  <Link href="/sign-out">
                    <DropdownMenuItem className="hover:bg-red-400/10 cursor-pointer text-red-400 focus:bg-red-400/10 focus:text-red-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <a
                href="/sign-in"
                className="border border-foreground text-foreground font-inter text-[13px] px-5 py-2 rounded-sm hover:bg-foreground/5 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/sign-up"
                className="bg-foreground text-background font-inter text-[13px] px-5 py-2 rounded-sm hover:bg-foreground/90 transition-colors"
              >
                Get Started
              </a>
            </>
          )}
        </div>


        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-background z-50 flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-cinzel text-sm tracking-[0.15em] text-[#E8E4DC]">EVNETY</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#E8E4DC]">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {['Home', 'Features', 'Pricing'].map((link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-inter text-2xl text-foreground"
                >
                  {link}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-8">
                {user ? (
                  <>
                    <Link
                      href="/console"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full bg-foreground text-background font-inter py-4 rounded-sm text-center"
                    >
                      Dashboard
                    </Link>
                    <a
                      href="/sign-out"
                      className="w-full border border-secondary/20 text-secondary font-inter py-4 rounded-sm text-center"
                    >
                      Sign Out
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/sign-in"
                      className="w-full border border-foreground text-foreground font-inter py-4 rounded-sm text-center"
                    >
                      Sign In
                    </a>
                    <a
                      href="/sign-up"
                      className="w-full bg-foreground text-background font-inter py-4 rounded-sm text-center"
                    >
                      Get Started
                    </a>
                  </>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
