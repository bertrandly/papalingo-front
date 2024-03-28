import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {SvelteKitPWA} from "@vite-pwa/sveltekit";

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
				includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
				manifest: {
					name: 'PapaLingo',
					short_name: 'PapaLingo',
					description: 'Jeanne\'s training app',
					theme_color: '#0d5a6f',
					icons: [
						{
							src: 'android-chrome-192x192.png',
							sizes: '192x192',
							type: 'image/png'
						},
						{
							src: 'android-chrome-256x256.png',
							sizes: '512x512',
							type: 'image/png'
						}
					]
				}
		}

		)
	]
});
