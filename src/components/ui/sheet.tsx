/**
 * astro/src/components/ui/sheet.tsx
 * https://ui.shadcn.com/docs/components/sheet
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';
import { cva } from 'class-variance-authority';

// COMPONENTS
import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { CloseLarge as CloseIcon } from '@carbon/icons-react';

// DATA
import { SURFACE_VARIANTS } from './variants.js';

// TYPES

/*//////////////////////////////////////////////////
CONFIG
//////////////////////////////////////////////////*/

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
/**
 * Dimmed background overlay element for the sheet dialog.
 *
 * @param className - Optional style overrides for the overlay element.
 * @param props - Forwarded primitive properties for the sheet overlay.
 * @param ref - Forwarded reference to the underlying DOM element.
 *
 * @returns A full-screen semi-transparent backdrop element.
 */
const SheetOverlay = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>>(
	({ className, ...props }, ref): React.JSX.Element => (
		<SheetPrimitive.Overlay
			className={cn('fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className)}
			{...props}
			ref={ref}
		/>
	),
);
/**
 * Core content region of the sheet, responsible for layout and close affordance.
 *
 * @param side - Screen edge from which the sheet should appear.
 * @param className - Optional style overrides for the content surface.
 * @param children - Arbitrary content rendered inside the sheet.
 *
 * @returns A positioned dialog panel with a built-in close btn.
 */
const SheetContent = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Content>,
	import('react').ComponentPropsWithoutRef<typeof import('@radix-ui/react-dialog').Content> & {
		side?: 'top' | 'bottom' | 'left' | 'right';
	}
>(({ side = 'right', className, children, ...props }, ref): React.JSX.Element => (
	<SheetPrimitive.Portal>
		<SheetOverlay />
		<SheetPrimitive.Content
			ref={ref}
			className={cn(
				cva('fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out', {
					variants: {
						// prettier-ignore
						side: { top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top', bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom', left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm', right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm', },
					},
					defaultVariants: { side: 'right' },
				})({ side }),
				SURFACE_VARIANTS({ variant: 'primary-outline' }),
				className,
			)}
			{...props}
		>
			{children}
			<SheetPrimitive.Close
				aria-label='Close sheet'
				className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-12 focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-white dark:data-[state=open]:bg-black'
			>
				<CloseIcon className='size-4' aria-hidden='true' />
				<span className='sr-only'>Close</span>
			</SheetPrimitive.Close>
		</SheetPrimitive.Content>
	</SheetPrimitive.Portal>
));
/**
 * Header region for sheet content, typically containing title and description.
 *
 * @param className - Optional style overrides for the header container.
 *
 * @param props - Additional sheet props forwarded to the primitive.
 *
 * @returns A flex container aligning header els vertically.
 */
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
	<div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
/**
 * Footer region for sheet content, usually hosting primary and secondary actions.
 *
 * @param className - Optional style overrides for the footer container.
 *
 * @param props - Additional sheet props forwarded to the primitive.
 *
 * @returns A responsive flex row that reorders actions on small screens.
 */
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
	<div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
/**
 * Title text for the sheet dialog.
 *
 * @param className - Optional style overrides for the title el.
 *
 * @returns A styled heading el representing the sheet title.
 */
const SheetTitle = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Title>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>>(({ className, ...props }, ref): React.JSX.Element => (
	<SheetPrimitive.Title ref={ref} className={cn('text-lg font-semibold text-primary-12', className)} {...props} />
));
/**
 * Supporting description text for the sheet dialog.
 *
 * @param className - Optional style overrides for the description el.
 *
 * @returns A styled paragraph el providing additional ctx.
 */
const SheetDescription = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Description>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>>(
	({ className, ...props }, ref): React.JSX.Element => <SheetPrimitive.Description ref={ref} className={cn('text-sm text-primary-11', className)} {...props} />,
);
SheetTrigger.displayName = SheetPrimitive.Trigger.displayName;
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
SheetContent.displayName = SheetPrimitive.Content.displayName;
SheetHeader.displayName = 'SheetHeader';
SheetFooter.displayName = 'SheetFooter';
SheetTitle.displayName = SheetPrimitive.Title.displayName;
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// prettier-ignore
export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
