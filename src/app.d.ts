// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			sendMail: ({ to, html, subject }: { to: string; html: string; subject?: string }) => Promise<{
				success: boolean;
				error: string | null;
				info?: unknown;
			}>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
