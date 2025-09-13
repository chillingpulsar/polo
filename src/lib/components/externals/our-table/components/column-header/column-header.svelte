<script lang="ts" generics="TData, TValue">
	import IconArrowsDownUp from '@tabler/icons-svelte/icons/arrows-down-up';
	import IconArrowUp from '@tabler/icons-svelte/icons/arrow-up';
	import IconArrowDown from '@tabler/icons-svelte/icons/arrow-down';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Column } from '@tanstack/table-core';
	import type { WithoutChildren } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import * as DropdownMenu from '$lib/components/internals/dropdown-menu';
	import { Button } from '$lib/components/internals/button';

	type Props = HTMLAttributes<HTMLDivElement> & {
		column: Column<TData, TValue>;
		title: string;
	};

	let { column, class: className, title, ...restProps }: WithoutChildren<Props> = $props();
</script>

{#if !column?.getCanSort()}
	<div class={className} {...restProps}>
		{title}
	</div>
{:else}
	<div class={cn('flex items-center', className)} {...restProps}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="ghost"
						size="sm"
						class="h-8 rounded-lg data-[state=open]:bg-accent "
					>
						<span>
							{title}
						</span>
						{#if column.getIsSorted() === 'desc'}
							<IconArrowDown />
						{:else if column.getIsSorted() === 'asc'}
							<IconArrowUp />
						{:else}
							<IconArrowsDownUp />
						{/if}
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Item
					class={column.getIsSorted() === 'asc'
						? 'bg-accent text-foreground'
						: 'text-muted-foreground'}
					onclick={() => {
						if (column.getIsSorted() === 'asc') return column.clearSorting();
						return column.toggleSorting(false);
					}}
				>
					<IconArrowUp
						class={cn('mr-2 size-3.5', column.getIsSorted() === 'asc' && 'text-foreground')}
					/>
					Highest
				</DropdownMenu.Item>
				<DropdownMenu.Item
					class={column.getIsSorted() === 'desc'
						? 'bg-accent text-foreground'
						: 'text-muted-foreground'}
					onclick={() => {
						if (column.getIsSorted() === 'desc') return column.clearSorting();
						return column.toggleSorting(true);
					}}
				>
					<IconArrowDown
						class={cn('mr-2 size-3.5', column.getIsSorted() === 'desc' && 'text-foreground')}
					/>
					Lowest
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{/if}
