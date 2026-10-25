/**
 * astro/src/components/ui/table.tsx
 * https://ui.shadcn.com/docs/components/table
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '../cn.js';

// COMPONENTS
import * as React from 'react';

/*//////////////////////////////////////////////////
COMPONENTS
//////////////////////////////////////////////////*/

/**
 * Table container primitive.
 *
 * @param className - Optional class name applied to the table.
 * @param props - Additional HTML table attributes forwarded to the element.
 */
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref): React.JSX.Element => (
	<div className='relative w-full overflow-auto'>
		<table ref={ref} className={cn('w-full caption-bottom rounded border-primary-6 text-sm', className)} {...props} />
	</div>
));

/**
 * Table header primitive (`<thead>`).
 *
 * @param className - Optional class name applied to the header.
 * @param props - Additional HTML table section attributes forwarded to the element.
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref): React.JSX.Element => (
	<thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));

/**
 * Table body primitive (`<tbody>`).
 *
 * @param className - Optional class name applied to the body.
 * @param props - Additional HTML table section attributes forwarded to the element.
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref): React.JSX.Element => (
	<tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));

/**
 * Table footer primitive (`<tfoot>`).
 *
 * @param className - Optional class name applied to the footer.
 * @param props - Additional HTML table section attributes forwarded to the element.
 */
const TableFooter = Object.assign(
	React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref): React.JSX.Element => (
		<tfoot ref={ref} className={cn('border-t bg-gray-100/50 font-medium dark:bg-gray-800/50 [&>tr]:last:border-b-0', className)} {...props} />
	)),
	{ displayName: 'TableFooter' },
);

/**
 * Table row primitive (`<tr>`).
 *
 * @param className - Optional class name applied to the row.
 * @param props - Additional HTML table row attributes forwarded to the element.
 */
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref): React.JSX.Element => (
	<tr
		ref={ref}
		className={cn(
			'border-b border-primary-6',
			// interactivity
			'transition-colors hover:bg-primary-2 data-[state=selected]:bg-primary-2',
			className,
		)}
		{...props}
	/>
));

/**
 * Table header cell primitive (`<th>`).
 *
 * @param className - Optional class name applied to the head cell.
 * @param props - Additional HTML table header cell attributes forwarded to the element.
 */
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref): React.JSX.Element => (
	<th ref={ref} className={cn('h-12 px-4 text-left align-middle font-medium text-primary-11 [&:has([role=checkbox])]:pr-0', className)} {...props} />
));

/**
 * Table cell primitive (`<td>`).
 *
 * @param className - Optional class name applied to the cell.
 * @param props - Additional HTML table cell attributes forwarded to the element.
 */
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref): React.JSX.Element => (
	<td ref={ref} className={cn('p-4 align-middle print:p-2 [&:has([role=checkbox])]:pr-0', className)} {...props} />
));

/**
 * Table caption primitive (`<caption>`).
 *
 * @param className - Optional class name applied to the caption.
 * @param props - Additional HTML table caption attributes forwarded to the element.
 */
const TableCaption = Object.assign(
	React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref): React.JSX.Element => (
		<caption ref={ref} className={cn('mt-4 text-sm text-gray-500 dark:text-gray-400', className)} {...props} />
	)),
	{ displayName: 'TableCaption' },
);

Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableHead.displayName = 'TableHead';
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableFooter, TableCaption };
