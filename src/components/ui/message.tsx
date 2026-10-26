/**
 * astro/src/components/ui/message.tsx
 * https://ui.shadcn.com/docs/components/base/message
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../../lib/cn.js';

// COMPONENTS
import * as React from 'react';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Renders the message group component.
 *
 * @param props - Props object containing the inputs required by message group.
 *
 * @return Group container for related messages.
 */
function MessageGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
	return <div data-slot='message-group' className={cn('flex min-w-0 flex-col gap-2', className)} {...props} />;
}

/**
 * Renders the message component.
 *
 * @param props - Props object containing the inputs required by message.
 *
 * @return Message container aligned according to the supplied mode.
 */
function Message({ className, align = 'start', ...props }: React.ComponentProps<'div'> & { align?: 'start' | 'end' }): React.JSX.Element {
	return <div data-slot='message' data-align={align} className={cn('group/message relative flex w-full min-w-0 gap-2 data-[align=end]:flex-row-reverse', className)} {...props} />;
}

/**
 * Renders the message content component.
 *
 * @param props - Props object containing the inputs required by message content.
 *
 * @return Message content container.
 */
function MessageContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
	return <div data-slot='message-content' className={cn('flex w-full min-w-0 flex-col gap-1.5 break-words', className)} {...props} />;
}

/**
 * Renders the message header component.
 *
 * @param props - Props object containing the inputs required by message header.
 *
 * @return Message header container.
 */
function MessageHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
	return <div data-slot='message-header' className={cn('flex min-w-0 max-w-full items-center px-3 text-xs text-primary-11', className)} {...props} />;
}
MessageGroup.displayName = 'MessageGroup';
Message.displayName = 'Message';
MessageContent.displayName = 'MessageContent';
MessageHeader.displayName = 'MessageHeader';

export { MessageGroup, Message, MessageContent, MessageHeader };
