<script lang="ts">
	import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
	import IconChevronRight from '@tabler/icons-svelte/icons/chevron-right';
	import { MediaQuery } from 'svelte/reactivity';
	import * as Pagination from '$lib/components/internals/pagination';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { urlParamReducer, urlParamStacker } from '$lib/utils';
	import { Skeleton } from '$lib/components/internals/skeleton';

	interface Props {
		count: number;
		perPage: number;
		isLoading: boolean;
	}

	let { count, perPage, isLoading }: Props = $props();

	const isDesktop = new MediaQuery('(min-width: 768px)');

	const siblingCount = $derived(isDesktop.current ? 1 : 0);

	let curPage = $derived(Number(page.url.searchParams.get('page') ?? 1));
</script>

<div class="flex w-fit items-center justify-end">
	{#if isLoading}
		<Skeleton class="h-[20px] w-[250px] rounded-full" />
	{:else}
		<Pagination.Root
			{count}
			{perPage}
			{siblingCount}
			onPageChange={async (pageValue) => {
				if (pageValue <= 1) {
					await goto(`${page.url.pathname}?${urlParamReducer('page', page)}`);
				} else {
					await goto(urlParamStacker('page', String(pageValue), page));
				}
			}}
			page={curPage}
			class="max-w-fit"
		>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton>
							<IconChevronLeft class="size-4" />
							<span class="hidden sm:block">Previous</span>
						</Pagination.PrevButton>
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton>
							<span class="hidden sm:block">Next</span>
							<IconChevronRight class="size-4" />
						</Pagination.NextButton>
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	{/if}
</div>
