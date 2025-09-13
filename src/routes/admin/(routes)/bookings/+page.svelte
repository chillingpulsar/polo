<script lang="ts">
	import Paginator from '$lib/components/externals/our-table/components/toolbars/pagination/paginator.svelte';
	import PageSize from '$lib/components/externals/our-table/components/toolbars/pagination/page-size.svelte';
	import ViewOptions from '$lib/components/externals/our-table/components/toolbars/view-options/view-options.svelte';
	import { columns, mapColumns } from './(components)/(table)/columns';
	import OurTable from '$lib/components/externals/our-table/our-table.svelte';

	import {
		type ColumnFiltersState,
		type RowSelectionState,
		type SortingState,
		type TableOptions,
		type VisibilityState,
		getCoreRowModel,
		getFilteredRowModel,
		getSortedRowModel
	} from '@tanstack/table-core';

	import { page } from '$app/state';
	import type { BookingsSchema } from './(components)/(table)/schema';

	const { data } = $props();

	let rowSelection = $state<RowSelectionState>({});
	let columnVisibility = $state<VisibilityState>({});
	let columnFilters = $state<ColumnFiltersState>([]);
	let sorting = $state<SortingState>([]);

	const urlPageSize = $derived(Number(page.url.searchParams.get('size') ?? 10));

	let count = $derived(0);
	const size = $derived(page.url.searchParams.get('size') ?? 10);

	const roleBasedColumns = () => {
		if (page.data.user_role === 'super_admin') return columns;
		else if (page.data.user_role === 'admin') return columns.filter((_, index) => index !== 4);

		return columns.filter((_, index) => index !== 4 && index !== 6);
	};

	const tableOptions = {
		get data() {
			return data.bookings ?? [];
		},
		state: {
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get columnFilters() {
				return columnFilters;
			}
		},
		columns: roleBasedColumns(),
		enableRowSelection: true,
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},

		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel()
	} as TableOptions<BookingsSchema>;
</script>

<main class="p-4">
	<OurTable
		{tableOptions}
		{columns}
		onDoubleClick={async (rowValue, e) => {
			/* e.preventDefault();
			e.stopPropagation();
			siloState.activeSilo = rowValue;
			await goto(urlParamStacker('id', rowValue.id, page)); */
		}}
	>
		{#snippet footerComponent({ table })}
			{#if count > Number(size)}
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<PageSize {count} />
						<ViewOptions {table} {mapColumns} />
					</div>
					<Paginator {count} perPage={urlPageSize} isLoading={false} />
				</div>
			{/if}
		{/snippet}
	</OurTable>
</main>
