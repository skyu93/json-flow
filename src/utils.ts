export const debounce = <T>(cb: (value?: T) => void, time: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (value?: T) => {
    if (timeoutId !== null) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      cb(value);
    }, time);
  };
};
