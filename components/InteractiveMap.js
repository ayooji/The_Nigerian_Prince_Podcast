import dynamic from 'next/dynamic';
import React from 'react';

const Map = dynamic(() => import('./LeafletMap'), {
  ssr: false,
});

const InteractiveMap = () => {
  return <Map />;
};

export default InteractiveMap;
