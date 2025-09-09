<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button, buttonVariants } from '$lib/components/internals/button/index';
	import { Calendar } from '$lib/components/internals/calendar/index';
	import * as Popover from '$lib/components/internals/popover/index';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value = $state<DateValue>();
</script>

<Popover.Root>
	<Popover.Trigger class={buttonVariants({ variant: 'outline', class: 'w-full justify-start' })}>
		<CalendarIcon class="mr-2 size-4" />
		<span>{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}</span>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value type="single" initialFocus />
	</Popover.Content>
</Popover.Root>
