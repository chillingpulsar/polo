<script lang="ts">
	import * as Carousel from '$lib/components/internals/carousel/index';
	import Pool1Image from '$lib/assets/avifs/pool1.avif';
	import Pool2Image from '$lib/assets/avifs/pool2.avif';
	import Pool3Image from '$lib/assets/avifs/pool3.avif';
	import Pool4Image from '$lib/assets/avifs/pool4.avif';
	import ChairsImage from '$lib/assets/avifs/chairs.avif';
	import GrillImage from '$lib/assets/avifs/grill.avif';
	import GrillWithBeefImage from '$lib/assets/avifs/grill-with-beef.avif';
	import IconArrowsMaximize from '@tabler/icons-svelte/icons/arrows-maximize';
	import * as Dialog from '$lib/components/internals/dialog/index';

	import { ScrollArea } from '$lib/components/internals/scroll-area/index';
	import type { CarouselAPI } from '$lib/components/internals/carousel/context';
	import Button from '$lib/components/internals/button/button.svelte';

	const images = [
		{
			title: 'Pool 1 pov',
			image: Pool1Image
		},
		{
			title: 'Pool 2 pov',
			image: Pool2Image
		},
		{
			title: 'Pool 3 pov',
			image: Pool3Image
		},
		{
			title: 'Pool 4 pov',
			image: Pool4Image
		},
		{
			title: 'Chairs',
			image: ChairsImage
		},
		{
			title: 'Grill',
			image: GrillImage
		},
		{
			title: 'Grill with beef',
			image: GrillWithBeefImage
		}
	];

	let api = $state<CarouselAPI>();
	let current = $state(1);

	let open = $state(false);

	$effect(() => {
		if (api) {
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});
</script>

<section id="home" class="container mx-auto grid items-center gap-4 p-4 md:grid-cols-2 md:pt-0">
	<div class="md:mb-30 md:max-w-xs">
		<div class="flex flex-col">
			<h1 class="text-center text-5xl font-medium tracking-widest md:text-left">Liria Circle</h1>
			<h3
				class="text-center text-3xl font-medium tracking-wider text-muted-foreground md:text-left"
			>
				Private Pool
			</h3>
		</div>
		<p class="mt-5 text-center text-base leading-normal text-muted-foreground md:text-left">
			Celebrate with us this summer! Aiming to let you experience utmost enjoyment and boding time
			with families and friends. The Liria Circle Pool offers tranquil space for relaxation and
			social gatherings.
		</p>
	</div>

	<div class="@container/carousel flex flex-col">
		<Carousel.Root opts={{ loop: true }} setApi={(emblaApi) => (api = emblaApi)}>
			<Carousel.Content>
				{#each images as image}
					<Carousel.Item class="relative">
						<img
							src={image.image}
							alt={image.title}
							class="h-100 w-full object-cover object-center"
						/>
						<Button onclick={() => (open = true)} variant="ghost" class="absolute right-4 bottom-4">
							<IconArrowsMaximize class="size-6 animate-pulse" />
						</Button>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>

		<ScrollArea orientation="horizontal" class="@/carousel:min-[616px]:w-full mt-2 pb-2 ">
			<div class="flex gap-2">
				{#each images as image, index}
					<button onclick={() => api?.scrollTo(index)}>
						<img
							src={image.image}
							alt={image.title}
							class={[
								'size-20 min-w-20 rounded-lg object-cover object-center',
								current === index + 1 ? 'border-2 border-red-300' : ''
							]}
						/>
					</button>
				{/each}
			</div>
		</ScrollArea>
	</div>
</section>

<Dialog.Root bind:open>
	<Dialog.Content class="min-h-screen min-w-screen">
		<img
			src={images[current - 1].image}
			alt="Pool 1"
			class="h-[90dvh] w-screen object-cover object-center"
		/>
	</Dialog.Content>
</Dialog.Root>
