<script lang="ts" generics="T extends { id: string, name: string }">
	import * as Select from '$lib/components/internals/select/index';
	import type { Snippet } from 'svelte';

	interface Props {
		selections: T[];
		selection?: Snippet<[{ selected: T }]>;
		selectedId: string;
		placeholder?: string;
		onChange?: (v: T | undefined) => void;
	}

	let {
		selections,
		selection,
		onChange,
		placeholder = 'Select an option',
		selectedId = $bindable()
	}: Props = $props();

	const selectedItem = $derived(selections.find((item) => item.id === selectedId));
</script>

<!--@component
@param {T[]} selections
@param selection is a Snippet that renders a selection item do not forget to import Select.Item - mikey
@bindable selectedId: string this is the primary key of the selected item
@returns onChange: (v: T) => void so you have a copy of the selected item
-->

<Select.Root
	type="single"
	allowDeselect
	bind:value={selectedId}
	onValueChange={() => {
		onChange?.(selectedItem);
	}}
>
	<Select.Trigger class="w-full">
		{selectedItem?.name ?? placeholder}
	</Select.Trigger>
	<Select.Content class="max-h-[200px]">
		{#if selection}
			{#each selections as selectionItem}
				{@render selection({ selected: selectionItem })}
			{/each}
		{:else}
			{#each selections as selectionItem}
				<Select.Item value={selectionItem.id}>{selectionItem.name}</Select.Item>
			{/each}
		{/if}
	</Select.Content>
</Select.Root>
