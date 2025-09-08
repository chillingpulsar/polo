<script lang="ts">
	import * as Form from '$lib/components/internals/form/index.js';
	import { Input } from '$lib/components/internals/input/index.js';
	import { Textarea } from '$lib/components/internals/textarea/index.js';
	import { contactUsSchema, type ContactUsSchema } from './schema';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	interface Props {
		contactUsForm: SuperValidated<ContactUsSchema>;
	}

	const { contactUsForm }: Props = $props();

	const form = superForm(contactUsForm, {
		validators: zodClient(contactUsSchema),
		id: crypto.randomUUID(),
		delayMs: 500,
		timeoutMs: 5000,
		onUpdate: async ({ result }) => {
			const { status, data } = result;

			switch (status) {
				case 200:
					toast.success(data.msg);
					form.reset();
					break;

				case 401:
					toast.error(data.msg);
					break;
			}
		}
	});

	const { form: formData, enhance, submitting, delayed } = form;
</script>

<section id="contact" class="container mx-auto flex flex-col gap-10 p-4 py-20 md:py-24">
	<div class="flex flex-col gap-4">
		<h1 class="text-4xl font-medium tracking-wider">Contact Us</h1>
	</div>

	<form method="POST" use:enhance class="flex max-w-xl flex-col gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<Form.Field {form} name="full_name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Full Name</Form.Label>
						<Input {...props} bind:value={$formData.full_name} placeholder="Enter your full name" />
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input
							type="email"
							{...props}
							bind:value={$formData.email}
							placeholder="Enter your email"
						/>
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Form.Field {form} name="your_subject">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Subject</Form.Label>
					<Input {...props} bind:value={$formData.your_subject} placeholder="Enter your subject" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="message">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Message</Form.Label>
					<Textarea {...props} bind:value={$formData.message} placeholder="Enter your message" />
				{/snippet}
			</Form.Control>
			<Form.Description>This is your public display message.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Submit</Form.Button>
	</form>
</section>
