/**
 * astro/src/components/ui/select.tsx
 * https://ui.shadcn.com/docs/components/select
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from './cn.js';

// COMPONENTS
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from '@carbon/icons-react';

// DATA
import { FORM_CONTROL_VARIANTS, OVERLAY_MOTION_VARIANTS, OVERLAY_SURFACE_VARIANTS, RADIX_SIDE_POSITION_VARIANTS } from './variants.js';

// TYPES
import type { SelectSize } from './types.js';

/*//////////////////////////////////////////////////
CONFIG
//////////////////////////////////////////////////*/

const SelectSizeCtx = React.createContext<SelectSize>('default');
SelectSizeCtx.displayName = 'SelectSizeCtx';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Root select component that manages open state and value.
 *
 * @param props - Select component props including size variant.
 * @param size - Visual size variant applied to the select trigger and its option list.
 *
 * @return A Radix Select root used to compose trigger and content.
 */
function Select({ size = 'default', ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & { size?: SelectSize }): React.JSX.Element {
	return (
		<SelectSizeCtx.Provider value={size}>
			<SelectPrimitive.Root {...props} />
		</SelectSizeCtx.Provider>
	);
}

/**
 * Group wrapper for related select items.
 *
 * @returns A labeled grouping element for select opts.
 */
const SelectGroup = SelectPrimitive.Group;

/**
 * Displays the currently selected value inside the trigger.
 *
 * @returns A read-only value container for the active opt.
 */
const SelectValue = SelectPrimitive.Value;

/**
 * Clickable trigger that opens the select content.
 *
 * @param className - Optional style overrides for the trigger.
 * @param children - Trigger label and value content.
 *
 * @returns A btn-like control that toggles the select menu.
 */
const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
		hideChevron?: boolean;
		size?: SelectSize;
		variant?: 'default' | 'ghost';
	}
>(({ className, children, hideChevron = false, size = 'default', variant = 'default', ...props }, ref): React.JSX.Element => {
	const resolvedSize = [size, React.useContext(SelectSizeCtx)][Number(size === 'default')];
	return (
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				'items-center justify-between text-nowrap ring-offset-transparent data-[placeholder]:text-primary-11 [&>span]:line-clamp-1',
				FORM_CONTROL_VARIANTS({ variant: variant === 'ghost' ? 'primary-ghost' : 'primary', size: resolvedSize === 'default' ? 'md' : resolvedSize }),
				variant === 'ghost' && 'enabled:hover:bg-primary-3',
				className,
			)}
			{...props}
		>
			{children}
			{!hideChevron && (
				<SelectPrimitive.Icon asChild>
					<ChevronDownIcon className='size-4 opacity-50' aria-hidden='true' />
				</SelectPrimitive.Icon>
			)}
		</SelectPrimitive.Trigger>
	);
});

/**
 * Scroll control displayed at the top of the select content.
 *
 * @param className - Optional style overrides for the scroll btn.
 *
 * @returns A btn that scrolls the opt list upwards.
 */
const SelectScrollUpButton = React.forwardRef<React.ElementRef<typeof SelectPrimitive.ScrollUpButton>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>>(
	({ className, ...props }, ref): React.JSX.Element => (
		<SelectPrimitive.ScrollUpButton ref={ref} aria-label='Scroll up' className={cn('flex cursor-default items-center justify-center py-1', className)} {...props}>
			<ChevronUpIcon className='size-4' aria-hidden='true' />
		</SelectPrimitive.ScrollUpButton>
	),
);

/**
 * Scroll control displayed at the bottom of the select content.
 *
 * @param className - Optional style overrides for the scroll btn.
 *
 * @returns A btn that scrolls the opt list downwards.
 */
const SelectScrollDownButton = React.forwardRef<React.ElementRef<typeof SelectPrimitive.ScrollDownButton>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>>(
	({ className, ...props }, ref): React.JSX.Element => (
		<SelectPrimitive.ScrollDownButton ref={ref} aria-label='Scroll down' className={cn('flex cursor-default items-center justify-center py-1', className)} {...props}>
			<ChevronDownIcon className='size-4' aria-hidden='true' />
		</SelectPrimitive.ScrollDownButton>
	),
);

/**
 * Overlay panel that renders the select opts.
 *
 * @param className - Optional style overrides for the content surface.
 * @param children - Option groups and items to render.
 * @param position - Positioning strategy for the content (default: 'popper').
 *
 * @returns A portal-based panel containing the opt list.
 */
const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { portalled?: boolean }>(
	({ className, children, portalled = true, position = 'popper', ...props }, ref): React.JSX.Element => {
		const content = (
			<SelectPrimitive.Content
				ref={ref}
				className={cn(
					'relative z-[110] max-h-[--radix-select-content-available-height] min-w-32 origin-[--radix-select-content-transform-origin]',
					'overflow-y-auto overflow-x-hidden rounded-md border',
					OVERLAY_SURFACE_VARIANTS(),
					OVERLAY_MOTION_VARIANTS(),
					RADIX_SIDE_POSITION_VARIANTS(),
					position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
					className,
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport className={cn('p-1', position === 'popper' && 'min-h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]')}>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		);
		return portalled ? <SelectPrimitive.Portal>{content}</SelectPrimitive.Portal> : content;
	},
);

/**
 * Text label used to describe a group of select items.
 *
 * @param className - Optional style overrides for the label.
 *
 * @returns A styled label element inside the opt list.
 */
const SelectLabel = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Label>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>>(
	({ className, ...props }, ref): React.JSX.Element => <SelectPrimitive.Label ref={ref} className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} {...props} />,
);

/**
 * Single opt within the select menu.
 *
 * @param className - Optional style overrides for the opt row.
 * @param children - Human-readable opt label.
 *
 * @returns A selectable item with active and checked state styling.
 */
const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
		icon?: React.ReactNode;
	}
>(({ className, children, icon, ...props }, ref): React.JSX.Element => {
	return (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				'group flex w-full cursor-default select-none items-center rounded-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:text-primary-10 data-[state=checked]:text-primary-10 data-[disabled]:opacity-50 dark:data-[highlighted]:text-primary-12 dark:data-[state=checked]:text-primary-12',
				(
					{
						xs: 'px-2 py-1 text-xs',
						sm: 'px-3 py-1.5 text-sm',
						default: 'px-3 py-2 text-sm',
						md: 'px-3 py-2 text-sm',
						lg: 'px-4 py-2 text-base',
						xl: 'px-4 py-3 text-lg',
					} as const satisfies Record<SelectSize, string>
				)[React.useContext(SelectSizeCtx)],
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>
				<span className='flex min-w-0 items-center gap-2'>
					{icon && <span className='flex size-4 shrink-0 items-center justify-center'>{icon}</span>}
					<span className='min-w-0 truncate'>{children}</span>
				</span>
			</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
});

/**
 * Visual divider used to separate logical groups of opts.
 *
 * @param className - Optional style overrides for the separator.
 *
 * @returns A horizontal rule inside the opt list.
 */
const SelectSeparator = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>>(
	({ className, ...props }, ref): React.JSX.Element => <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px border-t border-primary-6', className)} {...props} />,
);

SelectGroup.displayName = SelectPrimitive.Group.displayName;
SelectValue.displayName = SelectPrimitive.Value.displayName;
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
SelectContent.displayName = SelectPrimitive.Content.displayName;
SelectLabel.displayName = SelectPrimitive.Label.displayName;
SelectItem.displayName = SelectPrimitive.Item.displayName;
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator };
