import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Page } from '@sveltejs/kit';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parsePrice(priceString: string): number {
	// Remove commas, "Php", and any whitespace, then parse as number
	return parseInt(priceString.replace(/[,\s]/g, '').replace('Php', '')) || 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const urlParamStacker = (param: string, value: string, page: Page) => {
	const url = new URL(page.url);
	url.searchParams.set(param, value);
	return url.toString();
};

export const urlParamReducer = (param: string, page: Page) => {
	const searchParams = new URLSearchParams(page.url.searchParams);
	searchParams.delete(param);

	return searchParams;
};

export const removeUrlParam = async (
	param: string,
	page: Page,
	options?: { replaceState?: boolean; noScroll?: boolean }
) => {
	const searchParams = urlParamReducer(param, page);
	const newUrl = `${page.url.pathname}${searchParams.size > 0 ? '?' + searchParams.toString() : ''}`;

	const { goto } = await import('$app/navigation');
	await goto(newUrl, { replaceState: true, ...options });
};
