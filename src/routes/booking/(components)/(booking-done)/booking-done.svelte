<script lang="ts">
	import Button from '$lib/components/internals/button/button.svelte';
	import IconArrowLeft from '@tabler/icons-svelte/icons/arrow-left';

	interface Props {
		bookingDone: boolean;
	}

	let { bookingDone = $bindable() }: Props = $props();
</script>

<div class="flex min-h-[calc(100vh-10rem)] items-center justify-center">
	<div class="flex max-w-lg flex-col gap-4">
		<h1 class="text-2xl font-medium text-green-500">Booking Done 🎉</h1>
		<p>
			Please proceed to the site and provide the <b class="underline">transaction id</b> you may view
			it in your email. Thank you for choosing us!
		</p>
		<Button onclick={() => (bookingDone = false)} class="ml-auto">
			<IconArrowLeft class="size-4" />
			Book Another Event
		</Button>
	</div>
</div>
