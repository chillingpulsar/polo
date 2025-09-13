<script lang="ts" module>
	import IconChevronDown from '@tabler/icons-svelte/icons/chevron-down';
	import IconCheck from '@tabler/icons-svelte/icons/check';
	import { buttonVariants } from '$lib/components/internals/button';
	import * as DropdownMenu from '$lib/components/internals/dropdown-menu';
	import { Input } from '$lib/components/internals/input';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { urlParamReducer, urlParamStacker } from '$lib/utils';
	import type { Attachment } from 'svelte/attachments';
	type TData = unknown;

	interface Props {
		count?: number;
	}
</script>

<script lang="ts" generics="TData">
	const { count = 10 }: Props = $props();

	let pageSizes = $derived.by(() => {
		const allPossibleSizes = [10, 25, 50, 100];

		let result = allPossibleSizes.filter((size) => size <= count);

		if (result.length === 0 && count < 10) return [10];

		if (result.length === 0) return [10];

		return result;
	});

	let activePageSize = $derived.by(() => {
		const currSize = page.url.searchParams.get('size');

		if (Number(currSize) <= 10) return 10;
		else return Number(page.url.searchParams.get('size'));
	});

	let open = $state(false);
</script>

<DropdownMenu.Root
	bind:open
	onOpenChange={async () => {
		if (activePageSize <= 10) {
			await goto(`${page.url.pathname}?${urlParamReducer('size', page)}`);
		} else {
			await goto(urlParamStacker('size', String(activePageSize), page));
		}
	}}
>
	<DropdownMenu.Trigger
		class={buttonVariants({
			variant: 'outline',
			class: 'hidden lg:flex'
		})}
	>
		<span class="flex items-center gap-2 font-normal">
			Show {activePageSize} rows
		</span>
		<IconChevronDown class="size-4 text-muted-foreground" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="flex min-w-[165px] flex-col gap-3">
		<DropdownMenu.Group>
			{#each pageSizes as size}
				<DropdownMenu.Item>
					{#snippet child()}
						<div
							{@attach (node) => {
								node.addEventListener('click', async (e) => {
									activePageSize = size;
									open = false;
									if (activePageSize <= 10) {
										await goto(`${page.url.pathname}?${urlParamReducer('size', page)}`);
									} else {
										await goto(urlParamStacker('size', String(size), page));
									}
								});
							}}
							class="flex cursor-default items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
						>
							{#if activePageSize === size}
								<IconCheck class="size-4" />
							{/if}
							<span>{size} rows</span>
						</div>
					{/snippet}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>

		<div class="flex items-center gap-4 px-4 pb-2">
			<span class="text-sm">Show</span>
			<Input
				onchange={() => {
					if (activePageSize > count) {
						activePageSize = 10;
					}
				}}
				type="number"
				class="w-16 text-xs"
				bind:value={activePageSize}
			/>
			<span class="text-sm">from {count.toLocaleString()}</span>
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
