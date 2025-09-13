<script lang="ts" module>
	import IconChevronDown from '@tabler/icons-svelte/icons/chevron-down';
	import type { Table } from '@tanstack/table-core';
	import { buttonVariants } from '$lib/components/internals/button';
	import * as DropdownMenu from '$lib/components/internals/dropdown-menu';
	type TData = unknown;
</script>

<script lang="ts" generics="TData">
	let { table, mapColumns }: { table: Table<TData>; mapColumns?: Record<string, string> } =
		$props();

	const columns = $derived(
		table.getAllColumns().filter((col) => typeof col.accessorFn !== 'undefined' && col.getCanHide())
	);
</script>

{#if columns.length > 0}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class={buttonVariants({
				variant: 'outline',
				class: 'hidden lg:flex'
			})}
		>
			<span class="flex items-center gap-2 font-normal"> Select columns </span>
			<IconChevronDown class="size-4 text-muted-foreground" />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="min-w-[165px]">
			<DropdownMenu.Group>
				{#each columns as column}
					<DropdownMenu.CheckboxItem
						bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
						class="capitalize"
					>
						{#if mapColumns}
							{mapColumns[column.id as keyof typeof mapColumns]}
						{:else}
							{column.id}
						{/if}
					</DropdownMenu.CheckboxItem>
				{/each}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
