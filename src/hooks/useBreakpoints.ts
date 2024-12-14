import { useEffect, useRef, useState } from "react";

import Breakpoints from "./enums/Breakpoints";

interface IMediaQueryListAandCallback {
    list: MediaQueryList;
    callback: (e: MediaQueryListEvent) => void;
}

const breakpointKeys = Object.keys(Breakpoints).filter((b) => isNaN(Number(b)));

export default function useBreakpoints(isLessOrEqual = true): Record<keyof typeof Breakpoints, boolean> {
    const [matchesObj, setMatchesObj] = useState<Record<string, boolean>>({});
    const mediaQueryListAndCallbackRef = useRef<IMediaQueryListAandCallback[]>([]);

    useEffect(() => {
        const newMatchesObj: Record<string, boolean> = {};
        const mediaQueryListAndCallback = mediaQueryListAndCallbackRef.current;

        for (const b of breakpointKeys) {
            const breakpoint = Breakpoints[b as keyof typeof Breakpoints];
            const query = isLessOrEqual
                ? `(max-width: ${breakpoint}px)`
                : `(min-width: ${breakpoint + 1}px)`;

            const mediaQuery = window.matchMedia(query);
            newMatchesObj[b] = mediaQuery.matches;

            const handleMediaQueryChange =
                (e: MediaQueryListEvent) => setMatchesObj((prevValue) => ({ ...prevValue, [b]: e.matches }));

            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener("change", handleMediaQueryChange);
            } else {
                mediaQuery.addListener(handleMediaQueryChange);
            }

            mediaQueryListAndCallback.push({
                list: mediaQuery,
                callback: handleMediaQueryChange,
            });
        }

        setMatchesObj((prevValue) => ({ ...prevValue, ...newMatchesObj }));

        return () =>
            mediaQueryListAndCallback.forEach(({ list, callback }) => list.removeEventListener("change", callback));
    }, [isLessOrEqual]);

    return matchesObj;
}