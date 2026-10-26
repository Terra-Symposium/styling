/**
 * astro/src/components/ui/card.tsx
 * https://ui.shadcn.com/docs/components/card
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

// TYPES
import type { AnchorCardProps, CardProps } from './types.js';

/*//////////////////////////////////////////////////
VARIANTS
//////////////////////////////////////////////////*/

const CARD_SIZE_CTX = React.createContext<NonNullable<CardProps['size']>>('md');
CARD_SIZE_CTX.displayName = 'CardSizeContext';
const cardPadding = { xs: 'p-1.5 pt-1', sm: 'p-3 pt-2', md: 'p-6 pt-4', lg: 'p-8 pt-6', xl: 'p-10 pt-8' } as const;
const cardBodyText = { xs: 'text-sm', sm: 'text-base', md: 'text-base', lg: 'text-lg', xl: 'text-xl' } as const;

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Card container component.
 *
 * Renders a `<div>` by default, and upgrades to an `<a>` element when an
 * `href` is supplied.
 */
const Card = React.forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>((props, ref): React.JSX.Element => {
	const { children, className, variant = 'primary-tonal', size = 'md', inverse, disabled, printed = true, ...rest } = props;
	const cardSize = size ?? 'md';
	const isAnchor = 'href' in props;
	const classes = cn(
		cva(
			// Base styles for the card container
			'block w-full overflow-auto rounded-lg border shadow-sm transition duration-100',
			{
				variants: {
					// Defines the card scale.
					size: { xs: 'rounded-md', sm: 'rounded-lg', md: 'rounded-xl', lg: 'rounded-2xl', xl: 'rounded-3xl' },
					// Toggles an inner shadow
					inverse: { true: 'shadow-inner' },
					// Adds hover effects when the card is a link
					interactive: { true: 'duration-75 hover:-translate-y-0.5 hover:shadow-md' },
					// Applies the standard document-print treatment.
					printed: { true: 'print:rounded-xl print:border-2 print:bg-primary-1 print:text-primary-11 print:shadow-none' },
					// Applies disabled styles
					disabled: { true: 'border-gray-6 bg-gray-1 text-gray-12/50 opacity-50' },
				},
				defaultVariants: { size: 'md', printed: true },
			},
		)({ size: cardSize, inverse, disabled, interactive: isAnchor ? !disabled : false, printed }),
		SURFACE_VARIANTS({ variant }),
		className,
	);
	return (
		<CARD_SIZE_CTX.Provider value={cardSize}>
			{isAnchor ? (
				<a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} href={(props as AnchorCardProps).href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
					{children}
				</a>
			) : (
				<div ref={ref as React.Ref<HTMLDivElement>} className={classes} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
					{children}
				</div>
			)}
		</CARD_SIZE_CTX.Provider>
	);
});

// HEADER
/**
 * Card header section component.
 */
const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		topRight?: React.ReactNode;
	}
>(({ className, topRight, children, ...props }, ref): React.JSX.Element => {
	return (
		<div ref={ref} className={cn('flex flex-col space-y-1.5', topRight && 'flex-row flex-wrap items-center justify-between gap-2', cardPadding[React.useContext(CARD_SIZE_CTX)], className)} {...props}>
			{topRight ? <div>{children}</div> : children}
			{topRight}
		</div>
	);
});

// TITLE
/**
 * Primary title heading within a card header.
 */
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref): React.JSX.Element => {
	return <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', cardBodyText[React.useContext(CARD_SIZE_CTX)], className)} {...props} />;
});

/**
 * Flexible heading element for cards supporting dynamic heading tags (`as` prop).
 */
const CardHeading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' }>(
	({ as: Comp = 'h3', className, ...props }, ref): React.JSX.Element => {
		return (
			<Comp
				ref={ref}
				className={cn(
					'font-semibold leading-tight tracking-tight',
					({ xs: 'text-[11px]', sm: 'text-base', md: 'text-lg', lg: 'text-xl', xl: 'text-2xl' } as const)[React.useContext(CARD_SIZE_CTX)],
					className,
				)}
				{...props}
			/>
		);
	},
);

// DESCRIPTION
/**
 * Subordinate description text within a card.
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref): React.JSX.Element => {
	return (
		<p ref={ref} className={cn('opacity-80', ({ xs: 'text-[9px]', sm: 'text-sm', md: 'text-sm', lg: 'text-base', xl: 'text-lg' } as const)[React.useContext(CARD_SIZE_CTX)], className)} {...props} />
	);
});

/**
 * Flexible body text element within a card supporting dynamic tags (`as` prop).
 */
const CardText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & { as?: 'p' | 'div' }>(({ as: Comp = 'p', className, ...props }, ref): React.JSX.Element => {
	return (
		<Comp
			ref={ref}
			className={cn(
				({ xs: 'text-xs leading-snug', sm: 'text-sm', md: 'text-base leading-relaxed', lg: 'text-lg leading-relaxed', xl: 'text-xl leading-relaxed' } as const)[React.useContext(CARD_SIZE_CTX)],
				className,
			)}
			{...props}
		/>
	);
});

/**
 * Blockquote component formatted for cards.
 */
const CardQuote = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref): React.JSX.Element => {
	return (
		<blockquote
			ref={ref as React.Ref<HTMLQuoteElement>}
			className={cn(
				'text-pretty border-l-2 border-current pl-3 italic',
				({ xs: 'text-[9px]/snug', sm: 'text-xs/snug', md: 'text-base/snug', lg: 'text-lg/snug', xl: 'text-xl/snug' } as const)[React.useContext(CARD_SIZE_CTX)],
				className,
			)}
			{...props}
		/>
	);
});

/**
 * Meta text component for card attributions and timestamps.
 */
const CardMeta = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { as?: 'span' | 'cite' | 'p' | 'div' }>(({ as: Comp = 'span', className, ...props }, ref): React.JSX.Element => {
	return (
		<Comp
			ref={ref as React.Ref<HTMLSpanElement> & React.Ref<HTMLParagraphElement>}
			className={cn('whitespace-nowrap', ({ xs: 'text-[7px]', sm: 'text-[10px]', md: 'text-xs', lg: 'text-sm', xl: 'text-base' } as const)[React.useContext(CARD_SIZE_CTX)], className)}
			{...props}
		/>
	);
});

// CONTENT
/**
 * Main content body container for cards.
 */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref): React.JSX.Element => {
	const size = React.useContext(CARD_SIZE_CTX);
	return <div ref={ref} className={cn(cardPadding[size], cardBodyText[size], className)} {...props} />;
});

// FOOTER
/**
 * Footer container for action buttons or supplementary information.
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref): React.JSX.Element => {
	return <div ref={ref} className={cn('flex items-center', cardPadding[React.useContext(CARD_SIZE_CTX)], className)} {...props} />;
});
Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardHeading.displayName = 'CardHeading';
CardDescription.displayName = 'CardDescription';
CardText.displayName = 'CardText';
CardQuote.displayName = 'CardQuote';
CardMeta.displayName = 'CardMeta';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
export { Card, CardHeader, CardFooter, CardTitle, CardHeading, CardDescription, CardText, CardQuote, CardMeta, CardContent };
