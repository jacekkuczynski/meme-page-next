import React from 'react';

type MemeStreamLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

function MemeStreamLayout({ children }: MemeStreamLayoutProps) {
  return (
    <div className="flex flex-col items-center w-full mb-24 px-8 pb-8">
      {children}
    </div>
  );
}

export default MemeStreamLayout;
