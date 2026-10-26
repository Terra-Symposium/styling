import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

import { Children, isValidElement } from 'react';
import type { ReactNode } from 'react';

export function transformChildrenToString(children: ReactNode | ReactNode[]): string {
  if (!Array.isArray(children) && !isValidElement(children)) return childToString(children);
  return Children.toArray(children).reduce((text: string, child: ReactNode) => text.concat(isValidElement<{ children?: ReactNode | ReactNode[] }>(child) && Boolean(child.props.children) ? transformChildrenToString(child.props.children) : isValidElement(child) ? '' : childToString(child)), '');
}

function childToString(child?: ReactNode): string {
  if (typeof child === 'string') return child;
  if (typeof child === 'number' || typeof child === 'bigint') return child.toString();
  return '';
}
