/**
 * astro/src/components/ui/textarea.tsx
 * https://ui.shadcn.com/docs/components/textarea
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';
import { FORM_CONTROL_VARIANTS } from './variants.js';

// COMPONENTS
import * as React from 'react';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Textarea component designed to support multiline text inputs.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(({ className, ...props }, ref): React.JSX.Element => (
	<textarea className={cn('min-h-[80px]', FORM_CONTROL_VARIANTS({ variant: 'primary', size: 'md' }), className)} ref={ref} {...props} />
));
Textarea.displayName = 'Textarea';
export { Textarea };
