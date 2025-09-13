import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './lib/supabase/database.types';
import type { Session, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			sendMail: ({ to, html, subject }: { to: string; html: string; subject?: string }) => Promise<{
				success: boolean;
				error: string | null;
				info?: unknown;
			}>;

			supabase: SupabaseClient<Database>;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
