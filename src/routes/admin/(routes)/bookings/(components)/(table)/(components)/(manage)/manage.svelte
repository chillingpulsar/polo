<script lang="ts">
	import Button from '$lib/components/internals/button/button.svelte';
	import IconPencil from '@lucide/svelte/icons/pencil';
	import { page } from '$app/state';
	import type { BookingsSchema } from '../../schema';
	import { goto } from '$app/navigation';
	import { urlParamStacker } from '$lib/utils';

	let { row }: { row: BookingsSchema } = $props();
</script>

<Button
	variant="ghost"
	size="icon"
	onclick={async () => {
		await goto(urlParamStacker('id', row.id, page));
	}}
>
	<IconPencil class="size-4 text-muted-foreground" />
</Button>
