<script lang="ts">
	import DatePicker from '$lib/components/externals/date-picker/date-picker.svelte';
	import SelectPicker from '$lib/components/externals/select-picker/select-picker.svelte';
	import SelectPickerMultiple from '$lib/components/externals/select-picker/select-picker-multiple.svelte';
	import IconArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import * as Form from '$lib/components/internals/form/index';
	import { Input } from '$lib/components/internals/input/index';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { bookingSchema, type BookingSchema } from '../../schema';
	import * as Select from '$lib/components/internals/select/index';
	import { parseDate } from '@internationalized/date';
	import { addOns, baseRates } from '$lib';
	import { parsePrice } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import IconLoader2 from '@tabler/icons-svelte/icons/loader-2';

	interface Props {
		bookingForm: SuperValidated<BookingSchema>;
		bookingDone: boolean;
	}

	let { bookingForm, bookingDone = $bindable() }: Props = $props();

	const form = superForm(bookingForm, {
		validators: zodClient(bookingSchema),
		id: crypto.randomUUID(),
		timeoutMs: 5000,
		delayMs: 500,
		onUpdate: async ({ result }) => {
			const { status, data } = result;

			switch (status) {
				case 200:
					bookingDone = true;
					toast.success(data.msg);
					break;

				case 401:
					toast.error(data.msg);
					break;
			}
		}
	});

	const { form: formData, enhance, submitting, delayed } = form;

	const calculateTotal = $derived.by(() => {
		const baseRatePrice =
			baseRates.find((baseRate) => baseRate.id === $formData.base_rate)?.price ?? '0';

		if ($formData.add_ons) {
			const addOnsPrice = addOns.reduce((total, addOn) => {
				if ($formData?.add_ons?.includes(addOn.id)) {
					return total + parsePrice(addOn.price);
				}
				return total;
			}, 0);

			return addOnsPrice + parsePrice(baseRatePrice);
		}

		return parsePrice(baseRatePrice);
	});

	$effect(() => {
		$formData.total_price = calculateTotal ?? 0;
	});
</script>

<form method="POST" action="?/bookingEvent" use:enhance class="mt-10 flex flex-col gap-6">
	<input type="hidden" name="total_price" value={$formData.total_price} />
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Step 1: Enter Email</Form.Label>
					<Input {...props} bind:value={$formData.email} placeholder="Enter your email" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="phone_number">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Step 2: Enter Phone Number</Form.Label>
					<Input
						{...props}
						bind:value={$formData.phone_number}
						placeholder="Enter your phone number"
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="event">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Step 3: Select Event</Form.Label>
					<SelectPicker
						placeholder="Select an event"
						selections={[
							{ id: 'debut', name: 'Debut' },
							{ id: 'birthday', name: 'Birthday' },
							{ id: 'anniversary', name: 'Anniversary' },
							{ id: 'corporate', name: 'Corporate' },
							{ id: 'wedding', name: 'Wedding' },
							{ id: 'farewell', name: 'Farewell' }
						]}
						bind:selectedId={$formData.event}
						onChange={(v) => {}}
					/>
					<input type="hidden" name={props.name} value={$formData.event} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="base_rate">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Step 4: Select Base Rate</Form.Label>
					<SelectPicker
						selections={baseRates}
						bind:selectedId={$formData.base_rate}
						onChange={(v) => {
							console.log(v);
						}}
					>
						{#snippet selection({ selected })}
							<Select.Item value={selected.id}>
								{selected.name} - <b class="text-muted-foreground">({selected.price})</b>
							</Select.Item>
						{/snippet}
					</SelectPicker>

					<input type="hidden" name={props.name} value={$formData.base_rate} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="date">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Step 5: Select Date</Form.Label>

					<DatePicker
						bind:selectedDate={
							() => {
								if ($formData.date.length > 0) {
									return parseDate($formData.date) ?? undefined;
								}

								return undefined;
							},
							(x) => {
								$formData.date = x?.toString() ?? '';
							}
						}
					/>
					<input type="hidden" name={props.name} value={$formData.date} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="time">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Step 6: Select Time</Form.Label>
					<SelectPicker
						selections={[
							{ id: '07:00 AM - 03:00 PM', name: '07:00 AM - 03:00 PM' },
							{ id: '08:00 AM - 04:00 PM', name: '08:00 AM - 04:00 PM' },
							{ id: '09:00 AM - 05:00 PM', name: '09:00 AM - 05:00 PM' },
							{ id: '10:00 AM - 06:00 PM', name: '10:00 AM - 06:00 PM' }
						]}
						bind:selectedId={$formData.time}
						onChange={(v) => {
							console.log(v);
						}}
					/>
					<input type="hidden" name={props.name} value={$formData.time} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="add_ons">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Optional: Select Add-On</Form.Label>
					<SelectPickerMultiple
						placeholder="Select an add-on"
						selections={addOns}
						bind:selectedIds={
							() => {
								if ($formData.add_ons) {
									return $formData.add_ons;
								}
								return [];
							},
							(x) => {
								$formData.add_ons = x ?? [];
							}
						}
						onChange={(v) => {
							console.log(v);
						}}
					>
						{#snippet selection({ selected })}
							<Select.Item value={selected.id}>
								{selected.name} - <b class="text-muted-foreground">({selected.price})</b>
							</Select.Item>
						{/snippet}
					</SelectPickerMultiple>
					<input type="hidden" name={props.name} value={$formData.add_ons} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div class="flex flex-col gap-2 md:ml-auto">
		{#if $formData.add_ons || $formData.base_rate}
			<h4 class="text-xl text-muted-foreground">
				Total: {calculateTotal.toLocaleString() ?? '0'} Php
			</h4>
		{/if}

		<Form.Button disabled={$submitting || $delayed} class="relative">
			{#if $submitting || $delayed}
				<div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
					Please wait...
					<IconLoader2 class="size-4 animate-spin" />
				</div>
			{/if}
			Proceed to Checkout
			<IconArrowRight class="size-4" />
		</Form.Button>
	</div>
</form>
