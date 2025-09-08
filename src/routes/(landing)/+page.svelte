<script lang="ts">
	import AboutUs from './(components)/(about-us)/about-us.svelte';
	import Amenities from './(components)/(amenities)/amenities.svelte';
	import Reviews from './(components)/(reviews)/reviews.svelte';
	import Contact from './(components)/(contact)/contact.svelte';

	const { data } = $props();
</script>

<main class="py-20">
	<AboutUs />
	<Amenities />
	<Reviews />
	<Contact contactUsForm={data.contactUsForm} />
</main>
