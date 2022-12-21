import React from 'react';
import { SyncLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <SyncLoader size={30} color="#2563eb" />
    </div>
  );
}

export default LoadingSpinner;
