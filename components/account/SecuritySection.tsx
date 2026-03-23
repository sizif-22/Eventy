'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SessionItem = ({ 
  icon: Icon, 
  name, 
  location, 
  isActive = false, 
  isCurrent = false 
}: { 
  icon: any, 
  name: string, 
  location: string, 
  isActive?: boolean, 
  isCurrent?: boolean 
}) => (
  <div className="flex justify-between items-center py-5 border-b border-[#6B6B6B]/10 last:border-0">
    <div className="flex items-center gap-4">
      <Icon className="w-4 h-4 text-[#6B6B6B]" />
      <div className="space-y-0.5">
        <h4 className="font-inter text-[13px] text-[#E8E4DC]">{name}</h4>
        <p className="font-inter text-[11px] text-[#6B6B6B]">{location} · {isActive ? 'Active now' : 'Logged in'}</p>
      </div>
    </div>
    {isCurrent ? (
      <span className="border border-[#E8E4DC]/30 text-[#E8E4DC]/50 font-inter text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm">
        Current
      </span>
    ) : (
      <button className="font-inter text-xs text-[#6B6B6B] hover:text-[#E8E4DC] transition-colors">
        Revoke
      </button>
    )}
  </div>
);

export const SecuritySection = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className="space-y-4">
      <h3 className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">Security</h3>
      
      <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-8 space-y-12">
        {/* Password */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h4 className="font-inter text-[13px] text-[#E8E4DC]">Change Password</h4>
            <p className="font-inter text-xs text-[#6B6B6B]">Choose a strong password</p>
          </div>
          
          <div className="space-y-4 max-w-xl">
            {[
              { label: 'Current Password', show: showCurrent, setShow: setShowCurrent },
              { label: 'New Password', show: showNew, setShow: setShowNew },
              { label: 'Confirm New Password', show: showConfirm, setShow: setShowConfirm }
            ].map((field, i) => (
              <div key={i} className="space-y-1.5">
                <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">{field.label}</label>
                <div className="relative">
                  <Input 
                    type={field.show ? "text" : "password"}
                    className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-sm h-11 focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm pr-10"
                  />
                  <button 
                    onClick={() => field.setShow(!field.show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#E8E4DC] transition-colors"
                  >
                    {field.show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            ))}
            <div className="pt-2 flex justify-end">
              <Button 
                variant="outline" 
                className="border-[#6B6B6B]/40 text-[#E8E4DC] hover:border-[#E8E4DC] font-inter text-xs px-6 h-10 rounded-sm transition-all bg-transparent"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#6B6B6B]/15" />

        {/* Sessions */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h4 className="font-inter text-[13px] text-[#E8E4DC]">Active Sessions</h4>
            <p className="font-inter text-xs text-[#6B6B6B]">Devices currently signed in to your account</p>
          </div>

          <div className="divide-y divide-[#6B6B6B]/10">
            <SessionItem 
              icon={Monitor} 
              name="Chrome on macOS" 
              location="San Francisco, USA" 
              isActive 
              isCurrent 
            />
            <SessionItem 
              icon={Smartphone} 
              name="iPhone 15 Pro — Mobile App" 
              location="San Francisco, USA" 
              isActive={false} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
