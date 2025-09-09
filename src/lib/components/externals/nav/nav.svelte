<script lang="ts">
	import IconMenu2 from '@tabler/icons-svelte/icons/menu-2';
	import Button, { buttonVariants } from '$lib/components/internals/button/button.svelte';
	import Darkmode from '$lib/components/externals/darkmode/darkmode.svelte';
	import * as Sheet from '$lib/components/internals/sheet/index';

	const routes = [
		{
			title: 'Home',
			href: '/'
		},

		{
			title: 'Amenities',
			href: '/#amenities'
		},

		{
			title: 'Reviews',
			href: '/#reviews'
		},
		{
			title: 'Contact',
			href: '/#contact'
		}
	];

	let showMobileMenu = $state(false);
</script>

<nav class="sticky top-0 z-30 border-b bg-background">
	<section class="container mx-auto hidden items-center justify-between gap-4 px-4 py-2 md:flex">
		<div class="flex items-center gap-2">
			{#each routes as route}
				<a href={route.href} class="p-2 text-base font-light">{route.title}</a>
			{/each}
		</div>

		<div class="flex items-center gap-2">
			<Darkmode />
			<Button href="/booking">Book Event Now!</Button>
		</div>
	</section>

	<Sheet.Root bind:open={showMobileMenu}>
		<section class="container mx-auto flex items-center px-4 py-2 md:hidden">
			<Button href="/booking">Book Now!</Button>
			<div class="ml-auto flex items-center gap-2">
				<Darkmode />
				<Sheet.Trigger class={buttonVariants({ variant: 'ghost' })}>
					<IconMenu2 class="size-6" />
				</Sheet.Trigger>
			</div>
		</section>
		<Sheet.Content side="left">
			<div class="mt-20 flex flex-col gap-2 p-4">
				{#each routes as route}
					<a href={route.href} class="p-2 text-base font-light">{route.title}</a>
				{/each}
			</div>
		</Sheet.Content>
	</Sheet.Root>
</nav>
