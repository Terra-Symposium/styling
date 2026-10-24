import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { ACTION_VARIANTS } from './variants.js';

export type UiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type UiColor = 'primary' | 'secondary' | 'gray' | 'destructive';
export type UiType = 'default' | 'outline' | 'ghost' | 'tonal' | 'saturated' | 'link' | 'underline';
export type SurfaceMatrixVariant = UiColor | `${UiColor}-${Exclude<UiType, 'default' | 'link' | 'underline'>}`;
export type FormControlVariant = UiColor | `${UiColor}-${Extract<UiType, 'outline' | 'ghost' | 'tonal'>}`;
export type Size = UiSize;
export type SelectSize = 'default' | Size;
export type UiButtonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof ACTION_VARIANTS> & { asChild?: boolean; loading?: boolean };
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & { icon?: ReactNode; variant?: FormControlVariant | 'ghost'; size?: UiSize };
