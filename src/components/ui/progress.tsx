/**
 * astro/src/components/ui/progress.tsx
 * https://ui.shadcn.com/docs/components/progress
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';

// COMPONENTS
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

// TYPES
import type { ComponentProps } from 'react';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Shadcn-style progress primitive.
 *
 * @return Progress bar whose indicator reflects the supplied numeric value.
 */
export function Progress({ className, value, ...props }: ComponentProps<typeof ProgressPrimitive.Root> & { value?: number | null }): React.JSX.Element {
	const progressValue = value == null ? value : Number.isFinite(value) ? value : 0;
	return (
		<ProgressPrimitive.Root
			data-slot='progress'
			value={progressValue}
			aria-label={props['aria-label'] ?? (props['aria-labelledby'] ? undefined : 'Progress')}
			className={cn('relative h-4 w-full overflow-hidden rounded border border-primary-7 bg-primary-4', className)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot='progress-indicator'
				className='size-full flex-1 bg-primary-9 transition-all'
				style={{ transform: `translateX(-${100 - (typeof progressValue === 'number' ? progressValue : 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	);
}
