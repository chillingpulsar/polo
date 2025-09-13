<script lang="ts">
	import * as Form from '$lib/components/internals/form/index';
	import { Input } from '$lib/components/internals/input/index';
	import { adminLoginSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import IconLoader2 from '@tabler/icons-svelte/icons/loader-2';

	const { data } = $props();

	const form = superForm(data.adminLoginForm, {
		validators: zodClient(adminLoginSchema),
		id: crypto.randomUUID(),
		delayMs: 500,
		timeoutMs: 5000,
		onUpdate: async ({ result }) => {
			const { status, data } = result;

			switch (status) {
				case 200:
					toast.success(data.msg);

					break;

				case 401:
					toast.error(data.msg);
					break;
			}
		}
	});

	const { form: formData, enhance, submitting, delayed } = form;
</script>

<main class="container mx-auto flex min-h-screen items-center justify-center">
	<form
		method="POST"
		action="?/adminLoginEvent"
		use:enhance
		class="flex w-full max-w-xs flex-col gap-4"
	>
		<div class="my-4 flex flex-col gap-1">
			<h1 class="text-2xl font-medium">Admin Log in</h1>
			<p class="text-sm text-muted-foreground">Only authorized admin can log in.</p>
		</div>

		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Email</Form.Label>
					<Input {...props} bind:value={$formData.email} placeholder="Enter your email" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="password">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Password</Form.Label>
					<Input
						type="password"
						{...props}
						bind:value={$formData.password}
						placeholder="Enter your password"
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button disabled={$submitting || $delayed} class="relative">
			{#if $submitting || $delayed}
				<div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
					Please wait...
					<IconLoader2 class="size-4 animate-spin" />
				</div>
			{/if}
			Log in
		</Form.Button>
	</form>
</main>
