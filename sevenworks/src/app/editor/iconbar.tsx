"use client";

import React from 'react';
import Link from 'next/link';

const IconBar = () => {
  return (
    <div className="flex-none w-[70] h-full p-2 rounded-lg bg-[#E6E6E6]">
      {/* vertical stack */}
      <div className="flex flex-col gap-4 h-full">
        <div className="p-0.5 flex items-center justify-center">
          <Link href="/editor?tab=personal#personal-section">
            <img
              src="/user.svg"
              alt="user"
              className="w-8 h-8"
              style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }}
            />
          </Link>
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <Link href="/editor?tab=phone#phone-section">
            <img
              src="/phone.svg"
              alt="phone"
              className="w-8 h-8"
              style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }}
            />
          </Link>
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <Link href="/editor?tab=book#book-section">
            <img
              src="/book-open.svg"
              alt="open book"
              className="w-8 h-8"
              style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }}
            />
          </Link>
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <Link href="/editor?tab=work#work-section">
            <img
              src="/briefcase.svg"
              alt="briefcase"
              className="w-8 h-8"
              style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }}
            />
          </Link>
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <Link href="/editor?tab=award#award-section">
            <img
              src="/award.svg"
              alt="award"
              className="w-8 h-8"
              style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }}
            />
          </Link>
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <Link href="/editor?tab=add#add-section">
            <img
              src="/plus-square.svg"
              alt="plus square"
              className="w-8 h-8"
              style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }}
            />
          </Link>
        </div>
        <div className="mt-auto p-0.5 flex items-center justify-center">
          <Link href="/dashboard">
            <img
              src="/chevron-left.svg"
              alt="chevron left"
              className="w-8 h-8"
              style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IconBar;