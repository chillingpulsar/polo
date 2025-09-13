import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { BookingsSchema } from './schema';
import { renderComponent, renderSnippet } from '$lib/components/internals/data-table/index.js';
import ColumnHeader from '$lib/components/externals/our-table/components/column-header/column-header.svelte';
import Manage from './(components)/(manage)/manage.svelte';

export const mapColumns = {
	id: 'ID',
	transaction_id: 'Transaction ID',
	mobile_number: 'Mobile Number',
	booking_date: 'Booking Date',
	booking_time: 'Booking Time',
	booked_event: 'Booked Event',
	base_rate: 'Base Rate',
	add_ons: 'Add-ons',
	total_price: 'Total Price',
	created_at: 'Created At'
};

export const columns: ColumnDef<BookingsSchema>[] = [
	// id
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.id,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const idSnippet = createRawSnippet<[string]>(() => {
				const id = row.original.id;

				return {
					render: () => `<div class="w-full truncate pl-3">${id}</div>`
				};
			});

			return renderSnippet(idSnippet, row.getValue('id'));
		},
		enableSorting: false,
		enableHiding: true
	},

	// transaction id
	{
		accessorKey: 'transaction_id',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.transaction_id,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const transactionIdSnippet = createRawSnippet<[string]>(() => {
				const transactionId = row.original.transaction_id;

				return {
					render: () => `<div class="w-full truncate pl-3">${transactionId}</div>`
				};
			});

			return renderSnippet(transactionIdSnippet, row.getValue('transaction_id'));
		},
		enableSorting: false,
		enableHiding: true
	},

	// mobile number
	{
		accessorKey: 'mobile_number',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.mobile_number,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const mobileNumberSnippet = createRawSnippet<[string]>(() => {
				const mobileNumber = row.original.mobile_number;

				return {
					render: () => `<div class="w-full truncate pl-3">${mobileNumber}</div>`
				};
			});

			return renderSnippet(mobileNumberSnippet, row.getValue('mobile_number'));
		},
		enableSorting: false,
		enableHiding: true
	},

	// booking date
	{
		accessorKey: 'booking_date',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.booking_date,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const bookingDateSnippet = createRawSnippet<[string]>(() => {
				const bookingDate = row.original.booking_date;

				return {
					render: () => `<div class="w-full truncate pl-3">${bookingDate}</div>`
				};
			});

			return renderSnippet(bookingDateSnippet, row.getValue('booking_date'));
		},
		enableSorting: true,
		enableHiding: true
	},

	// booking time
	{
		accessorKey: 'booking_time',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.booking_time,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const bookingTimeSnippet = createRawSnippet<[string]>(() => {
				const bookingTime = row.original.booking_time;

				return {
					render: () => `<div class="w-full truncate pl-3">${bookingTime}</div>`
				};
			});

			return renderSnippet(bookingTimeSnippet, row.getValue('booking_time'));
		},
		enableSorting: true,
		enableHiding: true
	},

	// booked event
	{
		accessorKey: 'booked_event',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.booked_event,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const bookedEventSnippet = createRawSnippet<[string]>(() => {
				const bookedEvent = row.original.booked_event;

				return {
					render: () => `<div class="w-full truncate pl-3">${bookedEvent}</div>`
				};
			});

			return renderSnippet(bookedEventSnippet, row.getValue('booked_event'));
		},
		enableSorting: false,
		enableHiding: true
	},

	// base rate
	{
		accessorKey: 'base_rate',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.base_rate,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const baseRateSnippet = createRawSnippet<[string]>(() => {
				const baseRate = row.original.base_rate;

				return {
					render: () => `<div class="w-full truncate pl-3">${baseRate}</div>`
				};
			});

			return renderSnippet(baseRateSnippet, row.getValue('base_rate'));
		},
		enableSorting: true,
		enableHiding: true
	},

	// add-ons
	{
		accessorKey: 'add_ons',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.add_ons,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const addOnsSnippet = createRawSnippet<[string]>(() => {
				const addOns = row.original.add_ons;

				return {
					render: () => `<div class="w-full truncate pl-3">${addOns}</div>`
				};
			});

			return renderSnippet(addOnsSnippet, row.getValue('add_ons'));
		},
		enableSorting: false,
		enableHiding: true
	},

	// total price
	{
		accessorKey: 'total_price',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.total_price,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const totalPriceSnippet = createRawSnippet<[string]>(() => {
				const totalPrice = row.original.total_price;

				return {
					render: () => `<div class="w-full truncate pl-3">${totalPrice}</div>`
				};
			});

			return renderSnippet(totalPriceSnippet, row.getValue('total_price'));
		},
		enableSorting: true,
		enableHiding: true
	},

	// created at
	{
		accessorKey: 'created_at',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: mapColumns.created_at,
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			const createdAtSnippet = createRawSnippet<[string]>(() => {
				const createdAt = row.original.created_at;

				return {
					render: () => `<div class="w-full truncate pl-3">${createdAt}</div>`
				};
			});

			return renderSnippet(createdAtSnippet, row.getValue('created_at'));
		},
		enableSorting: true,
		enableHiding: true
	},

	// manage
	{
		accessorKey: 'manage',
		header: ({ column }) => {
			return renderComponent(ColumnHeader<BookingsSchema, unknown>, {
				column,
				title: 'Manage',
				class: 'truncate text-muted-foreground'
			});
		},
		cell: ({ row }) => {
			return renderComponent(Manage, { row: row.original });
		},
		enableSorting: false,
		enableHiding: false
	}
];
