/**
 * astro/src/components/ui/spinner.tsx
 * https://ui.shadcn.com/docs/components/spinner
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../cn.js';

// COMPONENTS
import { Loader2Icon as LoadIcon } from 'lucide-react';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Lightweight loading indicator built on top of the Carbon loading icon.
 *
 * @param props - Props object containing the inputs required by spinner.
 *
 * @return A spinning SVG icon with accessible loading semantics.
 */
function Spinner({ className, ...props }: React.ComponentProps<'svg'>): React.JSX.Element {
	return <LoadIcon role='status' aria-label='Loading' className={cn('size-4 animate-spin', className)} {...props} />;
}

Spinner.displayName = 'Spinner';

export { Spinner };
