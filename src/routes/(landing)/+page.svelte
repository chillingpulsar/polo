<script lang="ts">
	import AboutUs from './(components)/(about-us)/about-us.svelte';
	import Amenities from './(components)/(amenities)/amenities.svelte';
	import Reviews from './(components)/(reviews)/reviews.svelte';
	import Contact from './(components)/(contact)/contact.svelte';
	import Bg from '$lib/assets/jpegs/bg.jpeg';

	const { data } = $props();
</script>

<main class="bg-cover bg-fixed bg-center" style="background-image: url({Bg})">
	<div class="bg-background/70 py-20 dark:bg-background/90">
		<AboutUs />
		<Amenities />
		<Reviews />
		<Contact contactUsForm={data.contactUsForm} />
	</div>
</main>
