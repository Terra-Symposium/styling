/**
 * astro/src/components/ui/tabs.tsx
 * https://ui.shadcn.com/docs/components/tabs
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';
import { DISABLED_STATE_VARIANTS, FOCUS_VISIBLE_VARIANTS, TEXT_VARIANTS } from './variants.js';

// COMPONENTS
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/*//////////////////////////////////////////////////
CONFIG
//////////////////////////////////////////////////*/

const Tabs = TabsPrimitive.Root;

/**
 * Tabs list container primitive.
 *
 */
const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(({ className, ...props }, ref): React.JSX.Element => (
	<TabsPrimitive.List ref={ref} aria-label={props['aria-label'] ?? 'Tab options'} className={cn('mb-2 inline-flex items-center justify-center gap-2', className)} {...props} />
));

/**
 * Tabs trigger button primitive.
 *
 */
const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
	({ className, ...props }, ref): React.JSX.Element => (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				'inline-flex items-center justify-center whitespace-nowrap rounded border border-primary-6 px-3 py-1 ring-offset-white transition-all focus-visible:ring-primary-9 data-[state=active]:bg-primary-3 data-[state=active]:text-primary-12 data-[state=active]:shadow-sm dark:data-[state=active]:text-primary-12',
				TEXT_VARIANTS({ size: 'sm', weight: 'medium' }),
				FOCUS_VISIBLE_VARIANTS(),
				DISABLED_STATE_VARIANTS({ target: 'native' }),
				className,
			)}
			{...props}
		/>
	),
);

/**
 * Tabs content panel primitive.
 *
 */
const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
	({ className, ...props }, ref): React.JSX.Element => (
		<TabsPrimitive.Content
			ref={ref}
			className={cn('mt-2 ring-offset-white focus-visible:ring-primary-9 print:!block [&>:first-child]:!mt-0 [&>:last-child]:!mb-0 print:[&[hidden]]:!block', FOCUS_VISIBLE_VARIANTS(), className)}
			{...props}
		/>
	),
);

TabsList.displayName = TabsPrimitive.List.displayName;
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
