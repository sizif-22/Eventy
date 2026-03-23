'use client';

import React, { useState } from 'react';
import { Search, Download, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import * as XLSX from 'xlsx';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';

export const ResponsesTab = ({ eventId }: { eventId: Id<"events"> }) => {
  const [search, setSearch] = useState('');
  const submissions = useQuery(api.events.getEventSubmissions, { eventId });
  const updateStatus = useMutation(api.events.updateSubmissionStatus);

  const filteredSubmissions = submissions?.filter(s => {
    const searchLower = search.toLowerCase();
    const answersStr = JSON.stringify(s.answers).toLowerCase();
    return answersStr.includes(searchLower);
  }) || [];

  const exportToExcel = () => {
    if (!submissions) return;
    
    const exportData = submissions.map((s, i) => ({
      '#': i + 1,
      'Email': s.answers.email || 'N/A',
      'Status': s.status || 'PENDING',
      'Submitted At': new Date(s._creationTime).toLocaleString(),
      ...s.answers
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'Responses');
    XLSX.writeFile(wb, `evnety-responses-${eventId.slice(0, 6)}.xlsx`);
  };

  const handleCheckIn = async (submissionId: Id<"submissions">) => {
    try {
      await updateStatus({ submissionId, status: 'CHECKED_IN' });
      toast.success("Checked in successfully");
    } catch (err) {
      toast.error("Failed to check in");
    }
  };

  if (submissions === undefined) {
    return <div className="py-20 text-center text-[#6B6B6B]">Loading responses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-newsreader italic text-3xl text-[#E8E4DC]">Responses</h2>
          <p className="font-inter text-[13px] text-[#6B6B6B] mt-1">{submissions.length} submissions collected</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6B6B]" />
            <Input 
              className="bg-[#131313] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-xs pl-9 h-10 w-full focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm"
              placeholder="Search in submissions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button 
            variant="outline"
            onClick={exportToExcel}
            className="border-[#6B6B6B]/40 text-[#E8E4DC] hover:border-[#E8E4DC] font-inter text-xs px-5 h-10 rounded-sm w-full sm:w-auto flex items-center gap-2 bg-transparent cursor-pointer"
          >
            <Download size={14} />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-[#0D0D0D] border-b border-[#6B6B6B]/20">
            <tr>
              <th className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B] py-3.5 px-6 w-12">#</th>
              <th className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B] py-3.5 px-6">Identity (Email)</th>
              <th className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B] py-3.5 px-6">Other Details</th>
              <th className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B] py-3.5 px-6">Submitted At</th>
              <th className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B] py-3.5 px-6">Status</th>
              <th className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B] py-3.5 px-6 w-12 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6B6B6B]/10">
            {filteredSubmissions.map((res, i) => (
              <tr key={res._id} className="hover:bg-[#0D0D0D]/40 transition-colors group">
                <td className="py-4 px-6 font-inter text-xs text-[#6B6B6B]">{i + 1}</td>
                <td className="py-4 px-6 font-inter text-[13px] text-[#E8E4DC] font-medium">
                  {res.answers.email || 'Anonymous'}
                </td>
                <td className="py-4 px-6 font-inter text-[12px] text-[#6B6B6B]">
                  <div className="max-w-[300px] truncate">
                    {Object.entries(res.answers)
                      .filter(([k]) => k !== 'email')
                      .map(([k, v]) => `${v}`).join(', ') || 'No extra data'}
                  </div>
                </td>
                <td className="py-4 px-6 font-inter text-[12px] text-[#6B6B6B]">
                  {new Date(res._creationTime).toLocaleDateString()} · {new Date(res._creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block border px-2 py-0.5 font-inter text-[9px] uppercase tracking-wider rounded-sm ${
                    res.status === 'CHECKED_IN' 
                    ? 'border-[#E8E4DC]/40 text-[#E8E4DC]/70' 
                    : 'border-[#6B6B6B]/40 text-[#6B6B6B]'
                  }`}>
                    {res.status || 'PENDING'}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 hover:text-[#E8E4DC] text-[#6B6B6B] transition-colors outline-none cursor-pointer">
                      <MoreHorizontal size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#0D0D0D] border-[#6B6B6B]/20 text-[#E8E4DC] rounded-sm min-w-[160px]">
                      <DropdownMenuItem className="font-inter text-xs focus:bg-[#1a1a1a] cursor-pointer">
                        View Full Details
                      </DropdownMenuItem>
                      {res.status !== 'CHECKED_IN' && (
                        <DropdownMenuItem 
                          className="font-inter text-xs focus:bg-[#1a1a1a] cursor-pointer"
                          onClick={() => handleCheckIn(res._id)}
                        >
                          Mark as Checked In
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-[#6B6B6B]/15" />
                      <DropdownMenuItem className="font-inter text-xs focus:bg-[#1a1a1a] cursor-pointer text-red-400/70 focus:text-red-400">
                        Remove Response
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center pt-2">
        <p className="font-inter text-[11px] text-[#6B6B6B]">
          Showing {filteredSubmissions.length} of {submissions.length} total
        </p>
      </div>
    </div>
  );
};
