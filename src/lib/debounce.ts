export const debounce = (
  func: (...args: any[]) => void,
  wait: number,
  immediate: boolean = false
): ((...args: any[]) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: any[]) {
    const context = this;
    const later = () => {
      console.log("later");
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout as NodeJS.Timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
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
