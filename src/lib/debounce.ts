export const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
export const debounceOnChange = debounce(
  (
    onChange: ((event: Event, value: number) => void) | undefined,
    event: Event,
    value: number
  ) => {
    if (onChange) {
      onChange(event as unknown as Event, Number(value));
    }
  },
  500
);
