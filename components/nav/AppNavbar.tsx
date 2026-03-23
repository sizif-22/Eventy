'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User as UserIcon, Settings, LayoutDashboard } from 'lucide-react';
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

import Image from 'next/image';

export const AppNavbar = ({ logoImage, eventName }: { logoImage?: string; eventName?: string }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-background-2 border-b border-secondary/15 px-6">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            {logoImage ? (
              <div className="relative h-6 w-24">
                <Image 
                  src={logoImage} 
                  alt={eventName || "Event Logo"} 
                  fill 
                  className="object-contain object-left grayscale group-hover:grayscale-0 transition-all brightness-150"
                  unoptimized
                />
              </div>
            ) : (
              <span className="font-cinzel text-sm tracking-[0.15em] text-foreground uppercase">
                {eventName || "EVNETY"}
              </span>
            )}
          </Link>

          {/* Nav Links (Desktop) */}
          {/* <div className="hidden md:flex items-center gap-6">
            {['Console', 'Docs', 'Settings'].map((link) => (
              <Link
                key={link}
                href={link === 'Console' ? '/console' : '#'}
                className="font-inter text-[13px] text-secondary hover:text-foreground transition-colors"
              >
                {link}
              </Link>
            ))}
          </div> */}
        </div>

        {/* Right: User Profile & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none group cursor-pointer">
                <Avatar className="h-8 w-8 border border-secondary/20 transition-colors group-hover:border-secondary/40 rounded-xl">
                  <AvatarImage src={user.profilePictureUrl || ''} className='rounded-xl' />
                  <AvatarFallback className="bg-background-2 text-secondary text-[10px] rounded-xl">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 bg-background-2 border-secondary/20 text-foreground"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-newsreader italic text-lg font-normal">
                    {user.firstName} {user.lastName}
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-secondary/10" />

                <Link href="/">
                  <DropdownMenuItem className="hover:bg-secondary/5 cursor-pointer focus:bg-secondary/5 focus:text-foreground">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </DropdownMenuItem>
                </Link>

                {/* <Link href="/account">
                  <DropdownMenuItem className="hover:bg-secondary/5 cursor-pointer focus:bg-secondary/5 focus:text-foreground">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link> */}

                {/* <DropdownMenuItem className="hover:bg-secondary/5 cursor-pointer focus:bg-secondary/5 focus:text-foreground">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem> */}

                <DropdownMenuSeparator className="bg-secondary/10" />
                <Link href="/sign-out">
                  <DropdownMenuItem className="hover:bg-red-400/10 cursor-pointer text-red-400 focus:bg-red-400/10 focus:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="w-8 h-8 rounded-full bg-background border border-secondary/20 flex items-center justify-center">
              <UserIcon size={16} className="text-secondary" />
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 left-0 right-0 bg-background-2 border-b border-secondary/15 p-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {['Console', 'Docs', 'Settings'].map((link) => (
              <Link
                key={link}
                href={link === 'Console' ? '/console' : '#'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-inter text-lg text-secondary hover:text-foreground transition-colors"
              >
                {link}
              </Link>
            ))}
            <div className="h-px bg-secondary/10 my-2" />
            <Link
              href="/sign-out"
              className="font-inter text-lg text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Out
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

