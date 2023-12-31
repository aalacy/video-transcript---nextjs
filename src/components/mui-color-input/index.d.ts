import { ButtonProps } from "@mui/material/Button";
import type { ColorFormats } from "@ctrl/tinycolor";
import { JSX as JSX_2 } from "react/jsx-runtime";
import type { ColorInput as MuiColorInputValue } from "@ctrl/tinycolor";
import type { PopoverProps as PopoverProps_2 } from "@mui/material/Popover";
import { default as React_2 } from "react";
import type { TextFieldProps as TextFieldProps_2 } from "@mui/material/TextField";
import { TinyColor } from "@ctrl/tinycolor";

declare type ColorButtonElement = (props: MuiColorButtonProps) => JSX_2.Element;

export declare function matchIsValidColor(color: MuiColorInputValue): boolean;

export declare type MuiColorButtonProps = Omit<ButtonProps, "children"> & {
  bgColor: string;
  isBgColorValid: boolean;
  disablePopover: boolean;
};

export declare const MuiColorInput: React_2.ForwardRefExoticComponent<
  Omit<MuiColorInputProps, "ref"> & React_2.RefAttributes<HTMLDivElement>
>;

export declare type MuiColorInputColors = {
  hex: string;
  hsl: string;
  hsv: string;
  rgb: string;
  hex8: string;
};

export declare type MuiColorInputFormat = Extract<
  "hex" | "rgb" | "hex8" | "hsl" | "hsv",
  ColorFormats
>;

export declare interface MuiColorInputProps extends TextFieldProps {
  value: MuiColorInputValue;
  adornmentPosition?: "start" | "end";
  Adornment?: ColorButtonElement;
  fallbackValue?: MuiColorInputValue;
  format?: MuiColorInputFormat;
  disablePopover?: boolean;
  isAlphaHidden?: boolean;
  onChange?: (value: string, colors: MuiColorInputColors) => void;
  PopoverProps?: PopoverProps;
}

export { MuiColorInputValue };

declare type PopoverProps = Omit<
  PopoverProps_2,
  "anchorEl" | "open" | "children"
>;

declare type TextFieldProps = Omit<
  TextFieldProps_2,
  "onChange" | "select" | "type" | "multiline" | "defaultValue"
>;

export { TinyColor };

export {};
