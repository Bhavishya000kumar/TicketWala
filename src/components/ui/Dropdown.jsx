import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const Dropdown = ({
  options = [],
  value = null,
  onChange,
  placeholder = 'Select option',
  label = '',
  icon: Icon = null,
  searchable = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search query
  const filteredOptions = searchable
    ? options.filter((opt) => {
        const text = typeof opt === 'string' ? opt : opt.name || '';
        return text.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : options;

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    return typeof value === 'string' ? value : value.name || placeholder;
  };

  return (
    <div className={`relative flex flex-col w-full text-left ${className}`} ref={dropdownRef}>
      {label && <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-800 font-medium hover:border-zinc-300 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all cursor-pointer shadow-sm ${
          isOpen ? 'ring-1 ring-brand-red border-brand-red' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2.5 truncate">
          {Icon && <Icon className="w-4 h-4 text-zinc-400 shrink-0" />}
          <span className={value ? 'text-zinc-800' : 'text-zinc-400'}>{getDisplayValue()}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 bg-white border border-zinc-200 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {searchable && (
            <div className="sticky top-0 p-2 bg-white border-b border-zinc-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-400 ml-1 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm py-1 px-2 border-0 focus:outline-none focus:ring-0 text-zinc-800"
              />
            </div>
          )}
          <ul role="listbox" className="py-1">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-2.5 text-sm text-zinc-400 text-center">No options found</li>
            ) : (
              filteredOptions.map((option, idx) => {
                const isString = typeof option === 'string';
                const optId = isString ? option : option.id || idx;
                const optText = isString ? option : option.name;
                const isSelected = isString ? value === option : value?.id === option.id;

                return (
                  <li
                    key={optId}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-zinc-50 flex items-center justify-between transition-colors ${
                      isSelected ? 'bg-zinc-50 font-semibold text-brand-red' : 'text-zinc-700'
                    }`}
                  >
                    <span className="truncate">{optText}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
