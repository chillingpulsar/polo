<script lang="ts">
	import Button from '$lib/components/internals/button/button.svelte';
	import Separator from '$lib/components/internals/separator/separator.svelte';
	import BookingProcess from './(components)/(booking-process)/booking-process.svelte';
	import BookingDone from './(components)/(booking-done)/booking-done.svelte';

	const { data } = $props();

	let bookingDone = $state(false);
</script>

<main class="bg-background py-10">
	<section class="container mx-auto flex flex-col px-4">
		{#if bookingDone}
			<BookingDone bind:bookingDone />
		{:else}
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

			<BookingProcess bookingForm={data.bookingForm} bind:bookingDone />
		{/if}
	</section>
</main>
