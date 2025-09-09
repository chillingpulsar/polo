<script lang="ts">
	import Button from '$lib/components/internals/button/button.svelte';
	import DatePicker from '$lib/components/externals/date-picker/date-picker.svelte';
	import SelectPicker from '$lib/components/externals/select-picker/select-picker.svelte';
	import IconArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import * as Form from '$lib/components/internals/form/index';
	import { Input } from '$lib/components/internals/input/index';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { bookingSchema } from './schema';
	import Separator from '$lib/components/internals/separator/separator.svelte';
	import Label from '$lib/components/internals/label/label.svelte';
	import * as Select from '$lib/components/internals/select/index';

	const { data } = $props();

	const form = superForm(data.bookingForm, {
		validators: zodClient(bookingSchema)
	});

	const { form: formData, enhance, submitting, delayed } = form;
</script>

<main class="bg-background py-10">
	<section class="container mx-auto flex flex-col px-4">
		<h1 class="text-4xl font-medium tracking-wider">Booking Information</h1>
		<p class="mt-2 text-sm text-muted-foreground">
			Book an event for <b>Debut Party</b>, <b>Birthday Party</b>, <b>Anniversary Party</b>,
			<b>Corporate Event</b>, <b>Wedding Party</b>, <b>Farewell party</b> and more.
		</p>

		<!--Information-->
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			<div class="space-y-4">
				<h2 class="text-2xl font-medium">Daytime booking inclusion:</h2>
				<ul class="mt-2 list-disc pl-4 text-lg text-muted-foreground">
					<li>tables and chairs (fully set up)</li>
					<li>hot and cold water dispenser</li>
					<li>banner and tent</li>
					<li>umbrella and tent</li>
					<li>barbecue griller</li>
					<li>Bathroom</li>
					<li>shower</li>
				</ul>

				<h2 class="text-2xl font-medium">Note:</h2>
				<ul class="mt-2 list-disc pl-4 text-lg text-muted-foreground">
					<li>reservation fee is 50%</li>
					<li>non-refundable</li>
					<li>extension if available (1000/hr)</li>
				</ul>

				<h2 class="mt-10 text-2xl font-medium">For inquiry please call or text:</h2>
				<Button href="tel:091785501071">0917-85501071</Button>
				<p class="mt-2 text-lg text-muted-foreground">
					Private Pool is located at Lot. 18A Liria Circle Phase 2, Vista Verse Executive Village,
					Cainta Rizal.
				</p>
			</div>

			<div class="space-y-4">
				<h2 class="text-2xl font-medium">8 HOURS DAYTIME BOOKING:</h2>
				<ul class="mt-2 list-disc pl-4 text-lg text-muted-foreground">
					<li>07:00 AM - 03:00 PM</li>
					<li>08:00 AM - 04:00 PM</li>
					<li>09:00 AM - 05:00 PM</li>
					<li>10:00 AM - 06:00 PM</li>
				</ul>

				<h2 class="text-2xl font-medium">BASE RATE:</h2>
				<ul class="mt-2 list-disc pl-4 text-lg text-muted-foreground">
					<li>10 - 15 pax = 6,000 php</li>
					<li>20 - 30 pax = 8,000 php</li>
					<li>30 - 40 pax = 10,000 php</li>
					<li>40 - 50 pax = 12,000 php</li>
					<li>50 - 60 pax = 15,000 php</li>
					<li>60 - 80 pax = 18,000 php</li>
				</ul>

				<h2 class="text-2xl font-medium">Add-ons:</h2>
				<ul class="mt-2 list-disc pl-4 text-lg text-muted-foreground">
					<li>Karaoke = 1,200 php</li>
				</ul>
			</div>
		</div>
		<Separator class="my-10" />
		<!--Booking Form-->
		<h1 class="text-2xl font-medium">Booking Form</h1>

		<form method="POST" use:enhance class="mt-10 flex flex-col gap-6">
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
								selections={[
									{ id: '10-15', name: '10 - 15 pax', price: '6,000 Php' },
									{ id: '20-30', name: '20 - 30 pax', price: '8,000 Php' },
									{ id: '30-40', name: '30 - 40 pax', price: '10,000 Php' },
									{ id: '40-50', name: '40 - 50 pax', price: '12,000 Php' },
									{ id: '50-60', name: '50 - 60 pax', price: '15,000 Php' },
									{ id: '60-80', name: '60 - 80 pax', price: '18,000 Php' }
								]}
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
							<DatePicker />
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
									{ id: '1', name: '07:00 AM - 03:00 PM' },
									{ id: '2', name: '08:00 AM - 04:00 PM' },
									{ id: '3', name: '09:00 AM - 05:00 PM' },
									{ id: '4', name: '10:00 AM - 06:00 PM' }
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
							<SelectPicker
								placeholder="Select an add-on"
								selections={[{ id: 'karaoke', name: 'Karaoke', price: '1,200 Php' }]}
								bind:selectedId={
									() => {
										if ($formData.add_ons) {
											return $formData.add_ons;
										}
										return '';
									},
									(x) => {
										$formData.add_ons = x;
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
							</SelectPicker>
							<input type="hidden" name={props.name} value={$formData.add_ons} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="flex flex-col gap-2 md:ml-auto">
				<Form.Button>
					Proceed to Checkout
					<IconArrowRight class="size-4" />
				</Form.Button>
			</div>
		</form>
	</section>
</main>
