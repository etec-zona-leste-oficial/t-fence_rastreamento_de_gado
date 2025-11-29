import React, { useEffect, useState } from 'react';

function DelayedRender({ condition, delay = 500, children }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timer;
    if (condition) {
      timer = setTimeout(() => setShouldRender(true), delay);
    } else {
      setShouldRender(false);
    }

    return () => clearTimeout(timer);
  }, [condition, delay]);

  return shouldRender ? children : null;
}

export default DelayedRender;
