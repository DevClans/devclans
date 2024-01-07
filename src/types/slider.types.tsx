export type SliderProps = {
  maxValue: number;
  minValue: number;
  step: number;
  marks: boolean;
  defaultValue: number;
  onChange?: (e: Event, value: number) => void;
  heading?: string;
};
