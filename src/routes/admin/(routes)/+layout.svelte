<script lang="ts">
	import * as Sidebar from '$lib/components/internals/sidebar/index';
	import AppSidebar from '$lib/components/externals/sidebars/app-sidebar/app-sidebar.svelte';
	import SiteHeader from '$lib/components/externals/sidebars/site-header/site-header.svelte';

	const { children } = $props();
</script>

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar variant="inset" />
	<Sidebar.Inset class="min-w-0">
		<div class="h-[3rem]">
			<SiteHeader />
		</div>
		<div class="max-h-[calc(100dvh-4rem)] w-full overflow-auto">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
