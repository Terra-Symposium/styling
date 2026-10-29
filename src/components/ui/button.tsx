/**
 * astro/src/components/ui/button.tsx
 * https://ui.shadcn.com/docs/components/button
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';

// COMPONENTS
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Spinner } from './spinner.js';

// DATA
import { ACTION_VARIANTS } from './variants.js';

// TYPES
import type { VariantProps } from 'class-variance-authority';
import type { UiButtonButtonProps as ButtonProps } from './types.js';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Primary interactive button component.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, disabled = false, loading = false, children, ...props }, ref): React.JSX.Element => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(ACTION_VARIANTS({ variant, size, className }))}
			ref={ref}
			disabled={disabled || loading}
			// Automatically set aria-busy for screen readers based on the loading prop
			aria-busy={loading ? 'true' : undefined}
			{...props}
		>
			{loading && <Spinner />}
			{!(loading && (size === 'icon' || size === 'icon-sm')) && children}
		</Comp>
	);
});

/**
 * Anchor element styled to match button variants.
 */
const ButtonLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof ACTION_VARIANTS>>(
	({ children, className, variant, size, ...props }, ref): React.JSX.Element => (
		<a className={cn(ACTION_VARIANTS({ variant, size, className }))} ref={ref} {...props}>
			{children}
		</a>
	),
);

Button.displayName = 'Button';
ButtonLink.displayName = 'ButtonLink';

export { Button, ButtonLink };
