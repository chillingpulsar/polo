<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { buttonVariants } from '$lib/components/internals/button/index';
	import { Calendar } from '$lib/components/internals/calendar/index';
	import * as Popover from '$lib/components/internals/popover/index';

	interface Props {
		placeholder?: string;
		selectedDate?: DateValue;
	}

	let { placeholder = 'Pick a date', selectedDate = $bindable() }: Props = $props();

	let value = $state<DateValue>();

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
</script>

<Popover.Root
	onOpenChange={(open) => {
		if (!open) {
			selectedDate = value;
		} else {
			value = selectedDate;
		}
	}}
>
	<Popover.Trigger class={buttonVariants({ variant: 'outline', class: 'w-full justify-start' })}>
		<CalendarIcon
			class="mr-2 size-4 {selectedDate ? 'text-foreground' : 'text-muted-foreground'}"
		/>

		<span class={['font-normal', selectedDate ? 'text-foreground' : 'text-muted-foreground']}>
			{selectedDate ? df.format(selectedDate.toDate(getLocalTimeZone())) : placeholder}
		</span>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value type="single" initialFocus />
	</Popover.Content>
</Popover.Root>
