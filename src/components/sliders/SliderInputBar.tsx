"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { SliderProps } from "@/types";
import Text from "@/components/Text";
import { debounceOnChange } from "@/lib/debounce";

const Input = styled(MuiInput)`
  //   width: 42px;
`;

export default function SliderInputBar({
  maxValue = 2030,
  minValue = 2020,
  step = 1,
  marks = true,
  defaultValue = 2024,
  onChange,
  heading,
}: SliderProps) {
  const [value, setValue] = React.useState(defaultValue);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    debounceOnChange(onChange, event as unknown as Event, newValue as number);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
    debounceOnChange(
      onChange,
      event as unknown as Event,
      Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (value < minValue) {
      setValue(minValue);
    } else if (value > maxValue) {
      setValue(maxValue);
    }
  };

  return (
    <Box sx={{}}>
      {/* <Typography id="input-slider" gutterBottom> */}
      {heading && <Text type="medi16">{heading}</Text>}
      {/* </Typography> */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            step={step}
            min={minValue}
            max={maxValue}
            marks={marks}
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: step,
              min: minValue,
              max: maxValue,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
