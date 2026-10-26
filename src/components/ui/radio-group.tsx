/**
 * astro/src/components/ui/radio-group.tsx
 * https://ui.shadcn.com/docs/components/radio-group
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';
import { INTERACTIVE_CONTROL_VARIANTS, SURFACE_VARIANTS } from './variants.js';

// COMPONENTS
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

// TYPES
import type { UiSize } from './types.js';

/*//////////////////////////////////////////////////
CONFIG
//////////////////////////////////////////////////*/

const RADIO_CARD_SIZE_CLASSES: Record<UiSize, string> = {
	xs: 'p-2 text-xs',
	sm: 'p-2.5 text-sm',
	md: 'p-3 text-sm',
	lg: 'p-4 text-base',
	xl: 'p-6 text-lg',
};

const RADIO_CARD_VARIANT_CLASSES: Record<'correct' | 'ghost' | 'incorrect' | 'primary' | 'secondary', string> = {
	primary: cn(
		SURFACE_VARIANTS({ variant: 'primary-tonal' }),
		'ring-primary-9 focus-visible:bg-primary-7/20 data-[state=checked]:!border-primary-9 focus-visible:data-[state=unchecked]:ring-primary-7/70 enabled:hover:border-primary-6',
	),
	secondary: cn(
		SURFACE_VARIANTS({ variant: 'secondary-tonal' }),
		'ring-secondary-9 focus-visible:bg-secondary-7/20 data-[state=checked]:!border-secondary-9 focus-visible:data-[state=unchecked]:ring-secondary-7/70 enabled:hover:border-secondary-6',
	),
	correct: cn(SURFACE_VARIANTS({ variant: 'correct' }), 'ring-emerald-700 enabled:hover:border-emerald-700'),
	incorrect: cn(SURFACE_VARIANTS({ variant: 'destructive-tonal' }), 'ring-rose-700 enabled:hover:border-rose-700'),
	ghost: cn(SURFACE_VARIANTS({ variant: 'primary-ghost' }), 'ring-primary-9 focus-visible:bg-primary-3 data-[state=checked]:bg-primary-3 enabled:hover:bg-primary-3'),
};

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * RadioGroup root container primitive.
 *
 * @param className - Optional class name applied to the group container.
 * @param props - Additional props forwarded to RadioGroupPrimitive.Root.
 */
const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>>(
	({ className, ...props }, ref): React.JSX.Element => <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />,
);

/**
 * RadioGroup item primitive control.
 *
 * @param className - Optional class name applied to the item element.
 * @param variant - Optional color scheme variant ('primary' or 'secondary').
 * @param props - Additional props forwarded to RadioGroupPrimitive.Item.
 */
const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { variant?: 'primary' | 'secondary' }>(
	({ className, variant, ...props }, ref): React.JSX.Element => (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				// general
				'group flex aspect-square size-4 items-center justify-center rounded-full border transition-shadow focus:outline-none',
				INTERACTIVE_CONTROL_VARIANTS(),
				// default coloring
				'border-primary-7 text-primary-12 ring-offset-primary-1 focus:border-primary-9 focus:ring-primary-9 disabled:bg-primary-4',
				// secondary colouring
				variant === 'secondary' && 'border-secondary-7 text-secondary-11 ring-offset-secondary-1 focus:border-secondary-9 focus:ring-secondary-9 disabled:bg-secondary-4',
				// override
				className,
			)}
			{...props}
		>
			{/* Indicator */}
			<span className='block size-2 rounded-full transition-colors group-data-[state="checked"]:bg-primary-12 group-disabled:group-data-[state="checked"]:bg-primary-8' />
		</RadioGroupPrimitive.Item>
	),
);

/**
 * RadioGroup card item component for selectable card UI.
 *
 * @param className - Optional class name applied to the card item element.
 * @param variant - Card color and state variant.
 * @param size - Card padding and text size variant.
 * @param children - Card contents.
 * @param props - Additional props forwarded to RadioGroupPrimitive.Item.
 */
const RadioGroupCard = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { variant?: 'correct' | 'ghost' | 'incorrect' | 'primary' | 'secondary'; size?: UiSize }
>(({ className, variant = 'primary', size = 'md', children, ...props }, ref): React.JSX.Element => (
	<span className='contents'>
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				// general
				'flex w-full flex-col items-start space-y-1 text-balance rounded-lg border text-left ring-inset data-[state=checked]:ring-1',
				INTERACTIVE_CONTROL_VARIANTS(),
				RADIO_CARD_SIZE_CLASSES[size] ?? RADIO_CARD_SIZE_CLASSES.md,
				RADIO_CARD_VARIANT_CLASSES[variant] ?? RADIO_CARD_VARIANT_CLASSES.primary,
				// override
				className,
			)}
			{...props}
			asChild={false}
		>
			{children}
		</RadioGroupPrimitive.Item>
	</span>
));

/**
 * RadioGroup indicator component.
 *
 * @param className - Optional class name applied to the indicator element.
 * @param props - Additional props forwarded to RadioGroupPrimitive.Indicator.
 */
const RadioGroupIndicator = Object.assign(
	React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Indicator>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator>>(({ className, ...props }, ref): React.JSX.Element => (
		<RadioGroupPrimitive.Indicator ref={ref} className={cn('flex items-center justify-center', className)} {...props} />
	)),
	{ displayName: RadioGroupPrimitive.Indicator.displayName },
);

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
RadioGroupCard.displayName = 'RadioGroupCard';

export { RadioGroup, RadioGroupItem, RadioGroupCard, RadioGroupIndicator };
