import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import colors from "@/lib/colors";
import { UseFormRegister } from "react-hook-form";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: colors.border,
      color: colors.text,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  options,
  register,
  name,
  defaultValue,
}: {
  options: string[];
  name: string;
  register: UseFormRegister<any>;
  defaultValue?: string[];
}) {
  const theme = useTheme();
  // theme.typography.fontFamily = "var(--poppins)";
  // theme.palette.mode = "dark";
  // theme.components = {
  //   MuiChip: {
  //     defaultProps: {
  //       style: {
  //         backgroundColor: colors.priDarker,
  //         color: colors.heading,
  //       },
  //     },
  //   },
  //   MuiAutocomplete: {
  //     defaultProps: {
  //       ChipProps: {
  //         style: {
  //           backgroundColor: colors.priDarker,
  //           color: colors.heading,
  //         },
  //       },
  //     },
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: colors.border,
  //         color: colors.text,
  //         border: `1px solid ${colors.border}`,
  //       },
  //       paper: {
  //         styles: {
  //           backgroundColor: colors.border,
  //           color: colors.text,
  //         },
  //       },
  //     },
  //   },
  //   MuiButtonBase: {
  //     defaultProps: {
  //       style: {
  //         fontSize: 14,
  //       },
  //     },
  //   },
  //   MuiInputBase: {
  //     defaultProps: {
  //       style: {
  //         color: colors.text,
  //       },
  //     },
  //     styleOverrides: {
  //       root: {
  //         color: colors.text,
  //       },
  //     },
  //   },
  //   MuiOutlinedInput: {
  //     defaultProps: {
  //       style: {
  //         color: colors.text,
  //       },
  //     },
  //     styleOverrides: {
  //       root: {
  //         color: colors.text,
  //       },
  //     },
  //   },
  // };
  const [personName, setPersonName] = React.useState<string[]>(
    defaultValue || []
  );

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="w100">
      <FormControl
        className="card2 w100"
        style={{
          border: `1px solid ${colors.border}`,
        }}
      >
        {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          className="w100"
          value={personName}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          {...register(name, { onChange: handleChange })}
          renderValue={(selected) => (
            <Box
              className="w100 self-start"
              sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
            >
              {selected.map((value, i) => (
                <Chip
                  style={{
                    fontFamily: "var(--poppins)",
                  }}
                  className="text-text card"
                  key={i}
                  label={value}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options?.map((name, i) => (
            <MenuItem
              key={i}
              value={name}
              sx={{
                "&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected": {
                  color: colors.heading,
                  backgroundColor: colors.priDarker,
                },
                "&.MuiButtonBase-root.MuiMenuItem-root": {
                  fontFamily: "var(--poppins)",
                  fontSize: 14,
                },
              }}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
