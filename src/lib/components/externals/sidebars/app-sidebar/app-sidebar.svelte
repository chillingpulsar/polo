<script lang="ts">
	import DashboardIcon from '@tabler/icons-svelte/icons/dashboard';
	import ListDetailsIcon from '@tabler/icons-svelte/icons/list-details';
	import NavUser from '$lib/components/externals/sidebars/nav-user/nav-user.svelte';
	import NavMain from '$lib/components/externals/sidebars/nav-main/nav-main.svelte';
	import * as Sidebar from '$lib/components/internals/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import LiriaLogo from '$lib/assets/jpegs/logo.jpg?enhanced';
	import IconBlockquote from '@tabler/icons-svelte/icons/blockquote';

	const navRoutes = [
		{
			title: 'Dashboard',
			url: '/admin/dashboard',
			icon: DashboardIcon
		},
		{
			title: 'Bookings',
			url: '/admin/bookings',
			icon: IconBlockquote
		}
	];

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem class="grid grid-cols-[auto_1fr] items-center gap-2">
				<enhanced:img src={LiriaLogo} alt="Liria Circle" class="size-20 rounded-lg" />
				<div class="">
					<h3 class="text-xl font-semibold">LIRIA CIRCLE</h3>
					<p class="text-sm text-muted-foreground">Admin Panel</p>
				</div>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={navRoutes} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser />
	</Sidebar.Footer>
</Sidebar.Root>
