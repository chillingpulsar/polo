import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { PRIVATE_SMTP_PWD } from '$env/static/private';
import { PUBLIC_SMTP_EMAIL } from '$env/static/public';
import nodemailer from 'nodemailer';

// Paraglide middleware
const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

// Mailing middleware
const handleMailing: Handle = async ({ event, resolve }) => {
	// create reusable transporter object once
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com', // or your SMTP host
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: PUBLIC_SMTP_EMAIL,
			pass: PRIVATE_SMTP_PWD
		}
	});

	// attach helper to event.locals
	event.locals.sendMail = async ({
		to,
		html,
		subject = 'No Subject'
	}: {
		to: string;
		html: string;
		subject?: string;
	}) => {
		try {
			const info = await transporter.sendMail({
				from: `"Liara Corner Pool" <${PUBLIC_SMTP_EMAIL}>`,
				to,
				subject,
				html
			});

			return { success: true, error: null, info };
		} catch (err: unknown) {
			console.error('Mail error:', err);
			return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
		}
	};

	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleMailing);
