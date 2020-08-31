import React from 'react';
import Link from 'next/link';

export const Header: React.FunctionComponent = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-tractr p-6 h-24 relative">
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <Link href="/">
          <a>
            <img
              className="rounded-lg h-10"
              src="https://tractr.net/apple-touch-icon.png"
              alt="tractr-official-website"
            />
          </a>
        </Link>
        <span className="font-semibold text-xl tracking-tight pl-8">
          Tractr Test
        </span>
      </div>
    </nav>
  );
};
