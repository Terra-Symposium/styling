/**
 * astro/src/components/ui/badge.tsx
 * https://ui.shadcn.com/docs/components/badge
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';
import { cva } from 'class-variance-authority';

// COMPONENTS
import * as React from 'react';

// DATA
import { SURFACE_VARIANTS } from './variants.js';

// TYPES
import type { UiSize } from './types.js';

/*//////////////////////////////////////////////////
COMPONENT
//////////////////////////////////////////////////*/

/**
 * Renders a badge using the selected palette, size, and shape.
 *
 * @param props - Badge styles and element attributes.
 *
 * @return The styled badge element.
 */
function Badge({
	className,
	variant,
	size,
	rounded,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'homepage' | 'destructive' | 'outline' | 'solid';
	size?: UiSize;
	rounded?: 'full' | 'md' | 'sm' | 'none';
}): React.JSX.Element {
	return (
		<div
			className={cn(
				cva('inline-flex w-fit items-center whitespace-nowrap border font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2', {
					variants: {
						variant: {
							primary: SURFACE_VARIANTS({ variant: 'primary-tonal' }),
							secondary: SURFACE_VARIANTS({ variant: 'secondary-tonal' }),
							ghost: SURFACE_VARIANTS({ variant: 'primary-ghost' }),
							accent: 'border-primary-12/50 bg-primary-11 text-secondary-1',
							homepage: 'border-black/30 bg-primary-8/25 text-secondary-6 backdrop-blur',
							destructive: SURFACE_VARIANTS({ variant: 'destructive' }),
							outline: cn(SURFACE_VARIANTS({ variant: 'gray-outline' }), 'text-gray-950 dark:text-gray-50'),
							solid: SURFACE_VARIANTS({ variant: 'primary-saturated' }),
						},
						size: {
							xs: 'px-1.5 py-0.5 text-[0.65rem]',
							sm: 'px-2 py-0.5 text-xs',
							md: 'px-3 py-1 text-sm',
							lg: 'px-3 py-1 text-sm',
							xl: 'px-4 py-2 text-sm font-bold',
						},
						rounded: { full: 'rounded-full', md: 'rounded-md', sm: 'rounded-sm', none: 'rounded-none' },
					},
					defaultVariants: { variant: 'primary', size: 'md', rounded: 'full' },
				})({ variant, size, rounded, className }),
			)}
			{...props}
		/>
	);
}
Badge.displayName = 'Badge';
export { Badge };
