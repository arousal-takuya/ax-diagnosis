import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchSelect({
    options,
    value,
    onChange,
    placeholder = "選択してください",
    className
}: SearchSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={cn("relative", className)} ref={dropdownRef}>
            <div
                className="w-full p-3 border border-slate-200 rounded-lg bg-white flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={value ? "text-slate-900" : "text-slate-400"}>
                    {value || placeholder}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform text-slate-400 ${isOpen ? 'rotate-90' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500"
                                placeholder="検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt}
                                    className={cn(
                                        "px-4 py-2 text-sm cursor-pointer hover:bg-indigo-50",
                                        value === opt ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-700'
                                    )}
                                    onClick={() => {
                                        onChange(opt);
                                        setIsOpen(false);
                                        setSearchTerm("");
                                    }}
                                >
                                    {opt}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-slate-400 text-center">
                                見つかりません
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
