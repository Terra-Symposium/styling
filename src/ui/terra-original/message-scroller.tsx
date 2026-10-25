/**
 * astro/src/components/ui/message-scroller.tsx
 * https://ui.shadcn.com/docs/components/base/message-scroller
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../cn.js';

// COMPONENTS
import * as React from 'react';
import { MessageScroller as MessageScrollerPrimitive } from '@shadcn/react/message-scroller';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Renders the message scroller provider component.
 *
 * @param props - Props object containing the inputs required by message scroller provider.
 *
 * @return Provider component for message-scroller context.
 */
function MessageScrollerProvider(props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>): React.JSX.Element {
	return <MessageScrollerPrimitive.Provider {...props} />;
}

/**
 * Renders the message scroller component.
 *
 * @param props - Props object containing the inputs required by message scroller.
 *
 * @return Scrollable message-scroller root.
 */
function MessageScroller({ className, ...props }: React.ComponentProps<typeof MessageScrollerPrimitive.Root>): React.JSX.Element {
	return <MessageScrollerPrimitive.Root data-slot='message-scroller' className={cn('relative flex size-full min-h-0 flex-col overflow-hidden', className)} {...props} />;
}

/**
 * Renders the message scroller viewport component.
 *
 * @param props - Props object containing the inputs required by message scroller viewport.
 *
 * @return Scrollable message viewport.
 */
function MessageScrollerViewport({ className, ...props }: React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>): React.JSX.Element {
	return <MessageScrollerPrimitive.Viewport data-slot='message-scroller-viewport' className={cn('size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain', className)} {...props} />;
}

/**
 * Renders the message scroller content component.
 *
 * @param props - Props object containing the inputs required by message scroller content.
 *
 * @return Message content container with the supplied classes.
 */
function MessageScrollerContent({ className, ...props }: React.ComponentProps<typeof MessageScrollerPrimitive.Content>): React.JSX.Element {
	return <MessageScrollerPrimitive.Content data-slot='message-scroller-content' className={cn('flex h-max min-h-full flex-col', className)} {...props} />;
}

/**
 * Renders the message scroller item component.
 *
 * @param props - Props object containing the inputs required by message scroller item.
 *
 * @return Message item container with optional scroll anchoring.
 */
function MessageScrollerItem({ className, scrollAnchor = false, ...props }: React.ComponentProps<typeof MessageScrollerPrimitive.Item>): React.JSX.Element {
	return <MessageScrollerPrimitive.Item data-slot='message-scroller-item' scrollAnchor={scrollAnchor} className={cn('min-w-0 shrink-0', className)} {...props} />;
}
MessageScrollerProvider.displayName = 'MessageScrollerProvider';
MessageScroller.displayName = 'MessageScroller';
MessageScrollerViewport.displayName = 'MessageScrollerViewport';
MessageScrollerContent.displayName = 'MessageScrollerContent';
MessageScrollerItem.displayName = 'MessageScrollerItem';

export { MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem };
