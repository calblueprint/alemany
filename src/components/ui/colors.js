/**
 * This file contains a standard color scheme that you can
 * make use of when you are trying to style something.
 * The colors are sourced from the following webpage:
 *
 *   https://tailwindcss.com/docs/customizing-colors
 *
 * Try to lean on these colors and only use custom colors
 * if absolutely necessary.
 *
 * To use a color, import this file as
 *
 *   import colors from '../PATH/TO/colors.js'
 *
 * You can then access individual hex color codes
 * using colors.<COLOR NAME>[<COLOR DARKNESS>]
 * For example, to use blue with 500 darkness:
 *
 *   colors.blue[500]
 *
 * This file also exports a convenience function that
 * you can use to more cleanly access colors:
 *
 *   import { color } from '../PATH/TO/colors.js'
 *   color('blue.500')
 *   color('blue-500')
 *
 * You can also import individual colors:
 *
 *   import { gray } from '../PATH/TO/colors.js'
 */

export const gray = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
};
export const rose = {
  50: '#fff1f2',
  100: '#ffe4e6',
  200: '#fecdd3',
  300: '#fda4af',
  400: '#fb7185',
  500: '#f43f5e',
  600: '#e11d48',
  700: '#be123c',
  800: '#9f1239',
  900: '#881337',
};
export const orange = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
};
export const yellow = {
  50: '#fefce8',
  100: '#fef9c3',
  200: '#fef08a',
  300: '#fde047',
  400: '#facc15',
  500: '#eab308',
  600: '#ca8a04',
  700: '#a16207',
  800: '#854d0e',
  900: '#713f12',
};
export const green = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
};
export const blue = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#dbeafe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
};

const colors = {
  gray,
  rose,
  orange,
  yellow,
  green,
  blue,
};

export function color(ident) {
  const split = ident.split(/[-.]/);
  if (split.length !== 2) {
    return null;
  }
  const [name, darkness] = split;
  return colors[name][darkness];
}

export default colors;
