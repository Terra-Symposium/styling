import type * as Cmdk from 'cmdk';
import type * as EmblaCarousel from 'embla-carousel-react';
import type * as RadixDialog from '@radix-ui/react-dialog';
import type * as React from 'react';
import type * as ReactHookForm from 'react-hook-form';
import type { VariantProps } from 'class-variance-authority';
import type { ACTION_VARIANTS } from './variants.js';

/*//////////////////////////////////////////////////
CAROUSEL
//////////////////////////////////////////////////*/

// API
export type CarouselApi = EmblaCarousel.UseEmblaCarouselType[1];
export type CarouselCtxProps = { carouselRef: ReturnType<typeof EmblaCarousel.default>[0]; api: CarouselApi; scrollPrev: () => void; scrollNext: () => void; canScrollPrev: boolean; canScrollNext: boolean } & CarouselProps;
export type CarouselProps = { opts?: Parameters<typeof EmblaCarousel.default>[0]; plugins?: Parameters<typeof EmblaCarousel.default>[1]; orientation?: 'horizontal' | 'vertical'; setApi?: (api: CarouselApi) => void };

/*//////////////////////////////////////////////////
COLORS
//////////////////////////////////////////////////*/

// PALETTE
export type ArrayOf12<T> = [T, T, T, T, T, T, T, T, T, T, T, T];
export type ColorGenOpts = { accentLightness?: number; accentChroma?: number; hueAvoidanceShift?: number; hoverLightnessShift?: number; hoverChromaMultiplier?: number };
export type ColorScales = { light: ArrayOf12<string>; dark: ArrayOf12<string> };

/*//////////////////////////////////////////////////
COMMAND
//////////////////////////////////////////////////*/

// PROPS
export type CommandDialogProps = RadixDialog.DialogProps & { size?: Size; className?: string };
export type CommandInputProps = React.ComponentPropsWithoutRef<typeof Cmdk.Command.Input> & { value?: string; onValueChange?: ((value: string) => void) | undefined; onClear?: (() => void) | undefined };

/*//////////////////////////////////////////////////
FORMS
//////////////////////////////////////////////////*/

// CONTROLS
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & { icon?: React.ReactNode; variant?: FormControlVariant | 'ghost'; size?: UiSize };
export type SelectSize = 'default' | Size;
export type UiComboboxOption = { value: string; label: React.ReactNode; [key: string]: string | number | React.ReactNode };

// FIELD CONTEXT
export type FormFieldCtxVal<TFieldValues extends ReactHookForm.FieldValues = ReactHookForm.FieldValues, TName extends ReactHookForm.FieldPath<TFieldValues> = ReactHookForm.FieldPath<TFieldValues>> = { name: TName };

/*//////////////////////////////////////////////////
GENERAL
//////////////////////////////////////////////////*/

// IDENTIFIERS
export type DefaultClassNames = Record<string, string>;
export type IdArgs = { id: string };

/*//////////////////////////////////////////////////
SIDEBAR
//////////////////////////////////////////////////*/

// CONTEXT
export type SidebarCtxProps = { state: 'expanded' | 'collapsed'; open: boolean; setOpen: (open: boolean) => void; openMobile: boolean; setOpenMobile: (open: boolean) => void; isMobile: boolean; toggleSidebar: () => void };

/*//////////////////////////////////////////////////
UI
//////////////////////////////////////////////////*/

// BUTTONS
export type ButtonVariantProps = UiButtonButtonProps['variant'];
export type UiButtonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof ACTION_VARIANTS> & { asChild?: boolean; loading?: boolean };

// CARDS
export type AnchorCardProps = BaseCardProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type BaseCardProps = { variant?: SurfaceMatrixVariant | 'error' | 'correct' | 'info' | 'success' | 'warning' | 'transparent' | 'dark'; size?: Size; inverse?: boolean; interactive?: boolean; printed?: boolean; disabled?: boolean };
export type CardProps = (BaseCardProps & React.HTMLAttributes<HTMLDivElement> & { href?: never }) | AnchorCardProps;

// VARIANTS
export type CompactSize = Exclude<Size, 'xl'>;
export type FormControlVariant = UiColor | `${UiColor}-${Extract<UiType, 'outline' | 'ghost' | 'tonal'>}`;
export type Size = UiSize;
export type SurfaceMatrixVariant = UiColor | `${UiColor}-${Exclude<UiType, 'default' | 'link' | 'underline'>}`;
export type UiColor = 'primary' | 'secondary' | 'gray' | 'destructive';
export type UiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type UiType = 'default' | 'outline' | 'ghost' | 'tonal' | 'saturated' | 'link' | 'underline';
export type Variant = 'default' | 'sm' | 'xs';
