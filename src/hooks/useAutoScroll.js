import { useEffect, useRef } from "react";

export const useAutoScroll = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });

  return ref;
};
