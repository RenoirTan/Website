"use client";

import { useEffect, useRef } from "react";

export function useDivScrollRestoration(
  key: string,
  options?: {
    behavior?: ScrollBehavior | undefined;
    expiry?: number | undefined;
    beforeCallback?: (ref: React.RefObject<HTMLDivElement | null>) => void;
    afterCallback?: (ref: React.RefObject<HTMLDivElement | null>) => void;
  },
) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef(0);
  const expiry = options?.expiry ?? 60 * 1000; // 1 minute by default

  // Restore scroll position
  useEffect(() => {
    const elem = ref.current;

    if (options?.beforeCallback) {
      options.beforeCallback(ref);
    }

    const rawSaved = sessionStorage.getItem(key);
    // clear state so that a reload starts from the top
    sessionStorage.removeItem(key);

    if (elem && rawSaved) {
      const { scrollTop, timestamp } = JSON.parse(rawSaved);
      const isExpired = Date.now() - timestamp > expiry;
      if (!isExpired) {
        requestAnimationFrame(() => {
          elem.scrollTo({ top: scrollTop, behavior: options?.behavior ?? "smooth" });
        });
        scrollTopRef.current = scrollTop;
      }
    }

    const onScroll = () => {
      scrollTopRef.current = elem!.scrollTop;
    };

    if (elem) {
      const onScroll = () => {
        scrollTopRef.current = elem.scrollTop;
      };
      elem.addEventListener("scroll", onScroll);
    }

    if (options?.afterCallback) {
      options.afterCallback(ref);
    }

    return () => {
      elem?.removeEventListener("scroll", onScroll);
      sessionStorage.setItem(
        key,
        JSON.stringify({
          scrollTop: scrollTopRef.current,
          timestamp: Date.now(),
        }),
      );
    }
  }, [key]);

  return ref;
}
