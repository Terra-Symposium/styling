/**
 * astro/src/components/ui/input.tsx
 * https://ui.shadcn.com/docs/components/input
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';

// COMPONENTS
import * as React from 'react';

// DATA
import { FORM_CONTROL_VARIANTS } from './variants.js';

// TYPES
import type { InputProps } from './types.js';

/*//////////////////////////////////////////////////
 COMPONENTS
 //////////////////////////////////////////////////*/

/**
 * Text input control supporting multiple variants, sizes, and leading icons.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ icon, className, type = 'text', variant = 'primary', size = 'md', ...props }, ref): React.JSX.Element => {
	const input = (
		<input
			type={type}
			className={cn(
				FORM_CONTROL_VARIANTS({ variant: variant === 'ghost' ? 'primary-ghost' : variant, size }),
				variant === 'ghost' && 'h-auto border-0 p-0',
				// icon compensation
				Boolean(icon) && 'pl-10',
				// override
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
	if (!icon) return input;
	return (
		<div className='relative flex items-center'>
			<div className='pointer-events-none absolute left-3 flex items-center justify-center text-primary-11'>{icon}</div>
			{input}
		</div>
	);
});

Input.displayName = 'Input';

export { Input };
