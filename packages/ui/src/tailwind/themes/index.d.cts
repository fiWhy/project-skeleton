import type { RgbColor } from 'colord';
import type { Config } from 'tailwindcss';
export declare interface Palette {
  transparent: string;
  'natural-white': string;
  'natural-black': string;
  'natural-grey-100': string;
  'natural-grey-90': string;
  'natural-yellow': string;
  'primary-red': string;
  'primary-blue': string;
  'primary-purple': string;
  'secondary-green': string;
  'secondary-pink': string;
  'secondary-purple-100': string;
  'secondary-purple-90': string;
  'secondary-light-blue': string;
  'secondary-dark-yellow': string;
  'secondary-grey-100': string;
  'secondary-grey-90': string;
  'secondary-grey-80': string;
  'secondary-grey-70': string;
  'secondary-blue-100': string;
}

export declare type Keyframes = Required<
  Required<Config>['theme']
>['extend']['keyframes'];

export declare const keyframes: Keyframes;

export declare const palette: Record<Theme, Palette>;

export declare enum Theme {
  Dark = 'dark',
  Light = 'light'
}

export declare function toCssRgb(rgb: RgbColor): string;

export declare function varToColor(name: string): string;
