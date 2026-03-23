'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DangerZoneSection = () => {
  return (
    <section className="space-y-4">
      <h3 className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">Danger Zone</h3>
      
      <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm overflow-hidden">
        {/* Row 1 - Sign Out */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#6B6B6B]/10">
          <div className="space-y-1">
            <h4 className="font-inter text-[14px] text-[#E8E4DC]">Sign Out of All Devices</h4>
            <p className="font-inter text-xs text-[#6B6B6B]">Revoke all active sessions immediately</p>
          </div>
          <Button 
            variant="outline" 
            className="border-[#6B6B6B]/40 text-[#6B6B6B] hover:text-[#E8E4DC] hover:border-[#6B6B6B]/60 font-inter text-xs px-6 h-10 rounded-sm transition-all"
          >
            Sign Out All
          </Button>
        </div>

        {/* Row 2 - Delete Account */}
        <div className="flex justify-between items-center px-8 py-6">
          <div className="space-y-1">
            <h4 className="font-inter text-[14px] text-[#E8E4DC]">Delete Account</h4>
            <p className="font-inter text-xs text-[#6B6B6B]">Permanently delete your account and all associated data</p>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger 
              render={
                <Button 
                  variant="outline" 
                  className="border-red-900/60 text-red-400/80 hover:bg-red-950/20 hover:text-red-400 font-inter text-xs px-6 h-10 rounded-sm transition-all bg-transparent"
                >
                  Delete Account
                </Button>
              }
            />
            <AlertDialogContent className="bg-[#0D0D0D] border-[#6B6B6B]/20 max-w-md p-8">
              <AlertDialogHeader className="space-y-4">
                <AlertDialogTitle className="font-newsreader italic text-3xl text-[#E8E4DC]">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="font-inter text-sm text-[#6B6B6B] leading-relaxed">
                  This will permanently delete all your events, RSVP responses, and account data. 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-8 gap-3 sm:gap-3">
                <AlertDialogCancel 
                  variant="outline" 
                  className="border-[#6B6B6B]/40 text-[#E8E4DC] hover:bg-[#E8E4DC] hover:text-[#0D0D0D] font-inter text-xs px-8 h-11 rounded-sm transition-all bg-transparent"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-red-950 text-red-400 border border-red-900/60 hover:bg-red-900/40 font-inter text-xs px-8 h-11 rounded-sm transition-all"
                >
                  Yes, Delete Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};
