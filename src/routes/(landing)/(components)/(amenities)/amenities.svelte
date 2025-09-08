<script lang="ts">
	import * as Card from '$lib/components/internals/card/index';
	import IconGrill from '@tabler/icons-svelte/icons/grill';
	import IconPicnicTable from '@tabler/icons-svelte/icons/picnic-table';
	import IconPool from '@tabler/icons-svelte/icons/pool';
	import IconUmbrella from '@tabler/icons-svelte/icons/umbrella';
	import IconBath from '@tabler/icons-svelte/icons/bath';
	import IconBottle from '@tabler/icons-svelte/icons/bottle';

	const amenities = [
		{
			icon: IconGrill,
			title: 'Barbecue Grill',
			description: 'Get together with your family and friends and enjoy a barbecue by the pool.'
		},
		{
			icon: IconPicnicTable,
			title: 'Table & Chairs ',
			description: 'Relax and enjoy your time by the pool with a table and chairs.'
		},
		{
			icon: IconPool,
			title: 'Pool',
			description: 'Enjoy a refreshing swim in our pool.'
		},
		{
			icon: IconUmbrella,
			title: 'Tent & Umbrella',
			description: 'Relax and enjoy your time by the pool with a tent and umbrella.'
		},
		{
			icon: IconBath,
			title: 'Outdoor Shower',
			description: 'After a refreshing swim, rinse off with our outdoor shower.'
		},
		{
			icon: IconBottle,
			title: 'Water Dispenser',
			description: 'Stay hydrated with our water dispenser.'
		}
	];
</script>

<section id="amenities" class="container mx-auto">
	<div class="flex flex-col gap-4 p-4 py-20 md:py-24">
		<h1 class="text-4xl font-medium tracking-wider">Amenities</h1>
		<div class="grid gap-4 md:grid-cols-3">
			{#each amenities as amenity}
				<Card.Root>
					<Card.Content class="grid grid-cols-[auto_1fr] items-center gap-4">
						<amenity.icon class="size-10" />

						<div class="">
							<Card.Title>{amenity.title}</Card.Title>
							<Card.Description>{amenity.description}</Card.Description>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>
