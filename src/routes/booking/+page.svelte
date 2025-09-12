<script lang="ts">
	import Button from '$lib/components/internals/button/button.svelte';
	import Separator from '$lib/components/internals/separator/separator.svelte';
	import BookingProcess from './(components)/(booking-process)/booking-process.svelte';
	import BookingDone from './(components)/(booking-done)/booking-done.svelte';
	import IconPhone from '@tabler/icons-svelte/icons/phone';

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
					<Button href="tel:091785501071">
						<IconPhone class="size-4" />
						0917-855-1071
					</Button>
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

			<!--Maps Location-->
			<div class="mt-10">
				<iframe
					title="Google Maps location of Polo Private Pool"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.884517793852!2d121.1099265766307!3d14.605653776949785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b9db45315a2d%3A0x3f73ddff203cd34e!2sLiria%20Circle%20Private%20Pool%20for%20Rent!5e0!3m2!1sen!2sph!4v1757709761939!5m2!1sen!2sph"
					style="border:0;"
					allowfullscreen={true}
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					class="aspect-video"
				></iframe>
			</div>

			<Separator class="my-10" />

			<!--Booking Form-->
			<h1 class="text-2xl font-medium">Booking Form</h1>

			<BookingProcess bookingForm={data.bookingForm} bind:bookingDone />
			<div class="mt-10 animate-pulse rounded-lg border border-destructive bg-background p-4">
				<h4 class="text-lg font-medium text-destructive">No Refund Policy</h4>
				<p class="text-sm text-muted-foreground">
					No refund will be given if the event is cancelled or rescheduled.
				</p>
			</div>
		{/if}
	</section>
</main>
