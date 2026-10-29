/**
 * astro/src/components/ui/skeleton.tsx
 * https://ui.shadcn.com/docs/components/skeleton
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Generic loading skeleton block used to indicate content is being fetched.
 *
 * This component:
 * - Renders a rounded, pulsing div that adapts to its container size.
 * - Inherits additional class names so it can be shaped as text, cards, avatars, etc.
 *
 * @return A div styled as a skeleton placeholder.
 */
function Skeleton({ className, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
	return (
		<div
			role='status'
			aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
			aria-label={ariaLabel ?? 'Loading...'}
			className={cn('animate-pulse rounded-md bg-gray-100 dark:bg-gray-800', className)}
			{...props}
		/>
	);
}
export { Skeleton };
