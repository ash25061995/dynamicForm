import { useState, useEffect, useCallback } from 'react';

function useDebounce<T extends unknown[]>(callback: (...args: T) => void, delay: number,): (...args: T) => void {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [timer]);

    const debouncedCallback = useCallback(
        (...args: T) => {
            if (timer) clearTimeout(timer);
            const newTimer = setTimeout(() => {
                callback(...args);
            }, delay);
            setTimer(newTimer);
        },
        [callback, delay, timer],
    );

    return debouncedCallback;
}

export default useDebounce;