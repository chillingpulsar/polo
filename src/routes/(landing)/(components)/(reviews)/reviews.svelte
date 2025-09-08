<script lang="ts">
	import IconQuote from '@tabler/icons-svelte/icons/quote';
	import * as Card from '$lib/components/internals/card/index.js';
	import IconStar from '@tabler/icons-svelte/icons/star';
	const reviews = [
		{
			name: 'Myra Rebosa',
			review:
				'Absolutely stunning pool area! The water was crystal clear and the perfect temperature. The staff went above and beyond to make our family day special. My kids had an amazing time, and the facilities were spotless. Worth every peso!',
			rating: 5
		},
		{
			name: 'Pamela Perez Mar',
			review:
				'What an incredible experience! The ambiance is so relaxing and peaceful. I loved the attention to detail in the landscaping and the comfortable lounge areas. Perfect place for a weekend getaway with friends. Already planning our next visit!',
			rating: 5
		},
		{
			name: 'Carl Niveras',
			review:
				'Outstanding service and beautiful facilities! The pool area is well-maintained and the staff are genuinely helpful and friendly. Great value for money and the location is convenient. Highly recommend for anyone looking for a quality swimming experience.',
			rating: 5
		}
	];
</script>

<section id="reviews" class="container mx-auto">
	<div class="flex flex-col gap-4 p-4 py-20 md:py-24">
		<h1 class="text-4xl font-medium tracking-wider">Reviews</h1>

		<div class="flex flex-col gap-4">
			{#each reviews as review}
				<Card.Root>
					<Card.Header>
						<Card.Title>{review.name}</Card.Title>
						<Card.Description>
							<IconQuote class="size-4" />
							{review.review}
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="flex items-center gap-2">
							{#each Array(review.rating)}
								<IconStar class="size-4" />
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>
