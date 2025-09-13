<script lang="ts" generics="TData">
	import { Input } from '$lib/components/internals/input';
	import IconSearch from '@tabler/icons-svelte/icons/search';
	import type { Table } from '@tanstack/table-core';

	interface Props {
		table: Table<TData>;
		getColumn: keyof TData;
		placeholder?: string;
	}

	const { table, getColumn, placeholder = 'Not found' }: Props = $props();
</script>

<div class="relative flex items-center">
	<Input
		oninput={(e) => table.getColumn(getColumn as string)?.setFilterValue(e.currentTarget.value)}
		onchange={(e) => table.getColumn(getColumn as string)?.setFilterValue(e.currentTarget.value)}
		type="text"
		class="pr-8"
		{placeholder}
	/>
	<IconSearch class="absolute right-3 size-4 text-muted-foreground" />
</div>
