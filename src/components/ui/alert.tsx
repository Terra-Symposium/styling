/**
 * astro/src/components/ui/alert.tsx
 * https://ui.shadcn.com/docs/components/alert
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

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Visual container for contextual feedback msgs.
 *
 * @param variant - Visual variant for the alert.
 *
 * @returns A styled alert wrapper el.
 */
const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'correct' | 'destructive' }>(
	({ className, variant = 'default', ...props }, ref): React.JSX.Element => (
		<div
			ref={ref}
			role='alert'
			className={cn(
				cva('relative mb-6 w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7')(),
				SURFACE_VARIANTS({ variant: variant === 'default' ? 'gray-outline' : variant === 'destructive' ? 'destructive' : 'correct' }),
				className,
			)}
			{...props}
		/>
	),
);

/**
 * Heading text for an alert, used to summarise the msg content.
 *
 * @returns A styled heading el for the alert.
 */
const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref): React.JSX.Element => (
	<h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
));

/**
 * Supporting body content for an alert, providing detailed ctx.
 *
 * @returns A styled container for alert description text.
 */
const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref): React.JSX.Element => (
	<div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));

/*//////////////////////////////////////////////////
HELPERS
//////////////////////////////////////////////////*/

// VARIANT
/**
 * Renders a destructive alert for error states.
 *
 * @param props - Alert title, description, and optional class name.
 *
 * @return A destructive alert element.
 *
 * @remarks
 * This wraps the generic alert primitives with the error styling used by docs tooling.
 */
export function AlertError({ className, description, title }: { className?: string; description: string; title: string }): React.JSX.Element {
	return (
		<Alert variant='destructive' className={cn('docs-block my-0 mb-2 flow-root', className)}>
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{description}</AlertDescription>
		</Alert>
	);
}
Alert.displayName = 'Alert';
AlertTitle.displayName = 'AlertTitle';
AlertDescription.displayName = 'AlertDescription';
AlertError.displayName = 'AlertError';
export { Alert, AlertTitle, AlertDescription };
