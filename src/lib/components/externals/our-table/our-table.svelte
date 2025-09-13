<script lang="ts" module>
	import { page } from '$app/state';
	import {
		type ColumnDef,
		type TableOptions,
		type Table as TanstackTable
	} from '@tanstack/table-core';
	import { createSvelteTable } from '$lib/components/internals/data-table';
	import FlexRender from '$lib/components/internals/data-table/flex-render.svelte';
	import * as Table from '$lib/components/internals/table';
	import type { Snippet } from 'svelte';
	import ScrollArea from '$lib/components/internals/scroll-area/scroll-area.svelte';
</script>

<script lang="ts" generics="TData, TValue">
	interface Props {
		columns: ColumnDef<TData, TValue>[];
		onDoubleClick?: (
			row: TData,
			e: MouseEvent & {
				currentTarget: EventTarget & HTMLTableRowElement;
			}
		) => void;
		isLoading?: boolean;
		footerComponent?: Snippet<[{ table: TanstackTable<TData> }]>;
		tableOptions: TableOptions<TData>;
		componentHeader?: Snippet<[{ table: TanstackTable<TData> }]>;
	}

	let { columns, onDoubleClick, isLoading, footerComponent, tableOptions, componentHeader }: Props =
		$props();

	const table = createSvelteTable(tableOptions);

	const whatPage = $derived(Number(page.url.searchParams.get('page') ?? 1));
</script>

<div class="h-full space-y-4">
	{#if componentHeader}
		{@render componentHeader({ table })}
	{/if}

	<ScrollArea class="w-full" orientation="both">
		<div class="rounded-md border">
			<Table.Root>
				<Table.Header>
					{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
						<Table.Row>
							{#each headerGroup.headers as header (header.id)}
								<Table.Head colspan={header.colSpan}>
									{#if !header.isPlaceholder}
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
									{/if}
								</Table.Head>
							{/each}
						</Table.Row>
					{/each}
				</Table.Header>
				<Table.Body class="relative">
					{#if isLoading}
						<div
							class="absolute inset-0 flex items-center justify-center rounded-b-lg bg-secondary/90"
						>
							<span class="text-sm text-muted-foreground">Go to page {whatPage}.</span>
						</div>
					{/if}
					{#each table.getRowModel().rows as row (row.id)}
						<Table.Row
							data-state={row.getIsSelected() && 'selected'}
							ondblclick={onDoubleClick ? (e) => onDoubleClick(row.original, e) : undefined}
						>
							{#each row.getVisibleCells() as cell (cell.id)}
								<Table.Cell>
									<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
								</Table.Cell>
							{/each}
						</Table.Row>
					{:else}
						<Table.Row>
							<Table.Cell colspan={columns.length} class="h-24 text-center text-muted-foreground">
								No data found
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</ScrollArea>

	{#if footerComponent}
		{@render footerComponent({ table })}
	{/if}
</div>
