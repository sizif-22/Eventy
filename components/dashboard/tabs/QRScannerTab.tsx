'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ScanLine, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import { Html5Qrcode } from 'html5-qrcode';

export const QRScannerTab = ({ eventId }: { eventId: Id<"events"> }) => {
  const [isActive, setIsActive] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [scanResult, setScanResult] = useState<'SUCCESS' | 'ALREADY_SCANNED' | 'NOT_FOUND' | null>(null);
  const [lastScannedUser, setLastScannedUser] = useState<{ name: string; email: string } | null>(null);

  const submissions = useQuery(api.events.getEventSubmissions, { eventId });
  const updateStatus = useMutation(api.events.updateSubmissionStatus);

  const checkedInCount = submissions?.filter((s) => s.status === 'CHECKED_IN').length || 0;
  const remainingCount = (submissions?.length || 0) - checkedInCount;

  const submissionsRef = useRef(submissions);
  useEffect(() => {
    submissionsRef.current = submissions;
  }, [submissions]);

  const [element, setElement] = useState<HTMLElement | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const transitioningRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const startScanner = async () => {
      if (!element || !isActive || transitioningRef.current) return;
      if (html5QrCodeRef.current?.isScanning) return;

      transitioningRef.current = true;
      setIsStarting(true);
      try {
        if (!html5QrCodeRef.current) {
          html5QrCodeRef.current = new Html5Qrcode(element.id);
        }
        
        const scanner = html5QrCodeRef.current;
        const config = { 
          fps: 25,
          qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
              const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
              const qrboxSize = Math.floor(minEdgeSize * 0.75);
              return { width: qrboxSize, height: qrboxSize };
          },
          formatsToSupport: [ 0 ]
        };
        
        const devices = await Html5Qrcode.getCameras();
        if (!mounted) return;

        let cameraId: string;
        if (devices && devices.length > 0) {
          const backCamera = devices.find(d => 
            d.label.toLowerCase().includes('back') || 
            d.label.toLowerCase().includes('rear') ||
            d.label.toLowerCase().includes('camera 0')
          );
          cameraId = backCamera ? backCamera.id : devices[0].id;
        } else {
          cameraId = (await Html5Qrcode.getCameras())[0]?.id || "";
        }

        // Give any previous stop some time to breathe before restarting
        await new Promise(r => setTimeout(r, 200));
        if (!mounted) return;

        await scanner.start(cameraId || { facingMode: "environment" }, config, onScan, () => {});
        console.log("Scanner: successfully started");
      } catch (err) {
        console.warn("Scanner: start attempt failed", err);
      } finally {
        if (mounted) setIsStarting(false);
        transitioningRef.current = false;
      }
    };

    const stopScanner = async () => {
      if (transitioningRef.current || !html5QrCodeRef.current?.isScanning) return;
      
      transitioningRef.current = true;
      try {
        await html5QrCodeRef.current.stop();
        console.log("Scanner: successfully stopped");
      } catch (e) {
        console.warn("Scanner: stop command failed", e);
      } finally {
        transitioningRef.current = false;
      }
    };

    const onScan = async (decodedText: string) => {
      if (!mounted || transitioningRef.current) return;
      
      // Stop scanning immediately on detection to handle the UI transition safely
      await stopScanner();
      
      console.log("QR Decoded Event:", decodedText);
      try {
        const submission = submissionsRef.current?.find(s => s._id.toString() === decodedText.trim());
        
        if (!submission) {
          setScanResult('NOT_FOUND');
          toast.error(`Invalid Code: ${decodedText.slice(0, 8)}...`);
        } else if (submission.status === 'CHECKED_IN') {
          setScanResult('ALREADY_SCANNED');
          setLastScannedUser({ 
            name: (submission.answers.name as string) || 'Attendee', 
            email: (submission.answers.email as string) || '' 
          });
          toast.warning("Already Checked-In");
        } else {
          await updateStatus({ 
            submissionId: submission._id as Id<"submissions">, 
            status: 'CHECKED_IN' 
          });
          setLastScannedUser({ 
            name: (submission.answers.name as string) || 'Attendee', 
            email: (submission.answers.email as string) || '' 
          });
          setScanResult('SUCCESS');
          toast.success(`Welcome, ${submission.answers.name || 'Attendee'}!`);
        }
        
        // Let the result stay for 3 seconds, then restart
        setTimeout(async () => { 
          if (mounted) {
            setScanResult(null);
            // Re-trigger the start sequence
            if (isActive) startScanner();
          }
        }, 3000);
      } catch (err) {
        console.error("Scan processing error:", err);
        setScanResult('NOT_FOUND');
        setTimeout(() => { if (mounted) { setScanResult(null); if (isActive) startScanner(); } }, 3000);
      }
    };

    if (isActive && !scanResult) {
      startScanner();
    } else if (!isActive) {
      stopScanner();
    }

    return () => {
      mounted = false;
      if (html5QrCodeRef.current?.isScanning) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [element, isActive, scanResult, updateStatus, eventId]);




  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-newsreader italic text-3xl text-[#E8E4DC]">QR Check-In</h2>
          <p className="font-inter text-[13px] text-[#6B6B6B]">Scan attendee QR codes to check them in at the door.</p>
        </div>

        <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm aspect-square relative overflow-hidden flex flex-col items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center"
              >
                <ScanLine className="w-16 h-16 text-[#6B6B6B]/40 stroke-[1px]" />
                <p className="font-inter text-sm text-[#6B6B6B] mt-6">Camera access required</p>
                <Button 
                  onClick={() => setIsActive(true)}
                  variant="outline"
                  className="mt-6 border-[#6B6B6B]/40 text-[#E8E4DC] hover:border-[#E8E4DC] font-inter text-xs px-8 h-11 rounded-sm transition-all bg-transparent cursor-pointer"
                >
                  Enable Scanner
                </Button>
              </motion.div>
            ) : scanResult ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-0 z-20 bg-[#0D0D0D]/95 flex flex-col items-center justify-center p-8 text-center"
              >
                {(scanResult === 'SUCCESS' || scanResult === 'ALREADY_SCANNED') && (
                  <motion.div 
                    initial={{ opacity: 0.8 }} 
                    animate={{ opacity: 0 }} 
                    className="absolute inset-0 bg-white z-50 pointer-events-none" 
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {scanResult === 'SUCCESS' && (
                  <>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                      <CheckCircle className="w-16 h-16 text-[#E8E4DC] stroke-[1px]" />
                    </motion.div>
                    <h3 className="font-newsreader italic text-3xl text-[#E8E4DC] mt-6">{lastScannedUser?.name || 'Attendee'}</h3>
                    <p className="font-inter text-sm text-[#6B6B6B] mt-2 border-b border-[#6B6B6B]/20 pb-4">Checked in ✓</p>
                    <button 
                      onClick={() => setScanResult(null)}
                      className="mt-6 font-inter text-[10px] uppercase tracking-[0.2em] text-[#E8E4DC]/60 hover:text-[#E8E4DC] transition-colors cursor-pointer"
                    >
                      [ Scan Next ]
                    </button>
                  </>
                )}
                {scanResult === 'ALREADY_SCANNED' && (
                  <>
                    <AlertCircle className="w-16 h-16 text-yellow-500/80 stroke-[1px]" />
                    <h3 className="font-inter text-lg text-[#E8E4DC] mt-6">Already scanned</h3>
                    <p className="font-inter text-sm text-[#6B6B6B] mt-2 border-b border-[#6B6B6B]/20 pb-4">{lastScannedUser?.email}</p>
                    <button 
                      onClick={() => setScanResult(null)}
                      className="mt-6 font-inter text-[10px] uppercase tracking-[0.2em] text-[#E8E4DC]/60 hover:text-[#E8E4DC] transition-colors cursor-pointer"
                    >
                      [ Dismiss ]
                    </button>
                  </>
                )}
                {scanResult === 'NOT_FOUND' && (
                  <div className="bg-red-950/20 absolute inset-0 flex flex-col items-center justify-center p-8">
                    <XCircle className="w-16 h-16 text-red-400/80 stroke-[1px]" />
                    <h3 className="font-inter text-lg text-red-400/80 mt-6">Not recognized</h3>
                    <p className="font-inter text-sm text-red-400/60 mt-2 border-b border-red-400/20 pb-4">Invalid or expired QR code</p>
                    <button 
                      onClick={() => setScanResult(null)}
                      className="mt-6 font-inter text-[10px] uppercase tracking-[0.2em] text-red-400/60 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      [ Try Again ]
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]"
              >
                {/* Active Scanner Status Indicator */}
                {!isStarting && (
                  <>
                    <div className="absolute top-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/30 backdrop-blur-md">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-inter text-[10px] text-green-500 uppercase tracking-widest font-bold">Scanner Active</span>
                    </div>
                    <button 
                      onClick={() => setIsActive(false)}
                      className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#E8E4DC]/60 hover:text-[#E8E4DC] rounded-full border border-white/10 backdrop-blur-md transition-all font-inter text-[10px] uppercase tracking-widest font-bold cursor-pointer"
                    >
                      [ Close Scanner ]
                    </button>
                  </>
                )}

                {isStarting && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0D0D0D]/90 transition-all">
                    <div className="w-8 h-8 border-2 border-[#E8E4DC]/20 border-t-[#E8E4DC] rounded-full animate-spin" />
                    <p className="font-inter text-[11px] text-[#6B6B6B] mt-4 uppercase tracking-widest">Initialising Camera...</p>
                    <button 
                      onClick={() => {
                        setIsActive(false);
                        setIsStarting(false);
                      }}
                      className="mt-6 font-inter text-[10px] uppercase tracking-[0.2em] text-[#E8E4DC]/40 hover:text-[#E8E4DC] transition-colors cursor-pointer"
                    >
                      [ Cancel ]
                    </button>
                  </div>
                )}
                <div id="qr-reader" ref={(el) => setElement(el)} style={{ width: '100%', height: '100%' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-5">
            <span className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Total Checked In</span>
            <p className="font-newsreader text-4xl text-[#E8E4DC] mt-1">{checkedInCount}</p>
          </div>
          <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-5">
            <span className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Remaining</span>
            <p className="font-newsreader text-4xl text-[#E8E4DC] mt-1">{remainingCount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-newsreader italic text-2xl text-[#E8E4DC]">Recent Check-Ins</h2>
        </div>

        <div className="mt-5 space-y-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {submissions?.filter(s => s.status === 'CHECKED_IN')
              .sort((a, b) => b._creationTime - a._creationTime)
              .slice(0, 10).map((c) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 py-4 border-b border-[#6B6B6B]/10 last:border-0"
              >
                <Avatar className="w-9 h-9 border border-[#6B6B6B]/20 bg-[#131313]">
                  <AvatarFallback className="bg-transparent text-[#E8E4DC] font-newsreader italic text-sm">
                    {(c.answers.email as string)?.[0].toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-inter text-sm text-[#E8E4DC] truncate">{(c.answers.name as string) || (c.answers.email as string)}</h4>
                  <p className="font-inter text-xs text-[#6B6B6B] truncate">{(c.answers.email as string)}</p>
                </div>
                <div className="text-right">
                  <p className="font-inter text-[11px] text-[#6B6B6B]">
                    {new Date(c._creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {submissions?.filter(s => s.status === 'CHECKED_IN').length === 0 && (
            <div className="py-20 text-center text-[#6B6B6B] font-inter text-sm italic">
              No one has checked in yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

