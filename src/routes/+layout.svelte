<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/externals/nav/nav.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/internals/sonner/index';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<Toaster />
<ModeWatcher defaultTheme="dark" />
{#if !page.url.pathname.startsWith('/admin')}
	<Nav />
{/if}
{@render children?.()}
