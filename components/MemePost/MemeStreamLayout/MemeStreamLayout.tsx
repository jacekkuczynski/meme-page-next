import React from 'react';

type MemeStreamLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

function MemeStreamLayout({ children }: MemeStreamLayoutProps) {
  return (
    <div className="flex flex-col items-center w-full my-24">{children}</div>
  );
}

export default MemeStreamLayout;
