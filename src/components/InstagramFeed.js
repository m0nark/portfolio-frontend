import React, { useEffect } from 'react';

const InstagramFeed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://w.behold.so/widget.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-8">
      <behold-widget feed-id="4GZwfNvBHet9bchhQlt4"></behold-widget>
    </div>
  );
};

export default InstagramFeed;
