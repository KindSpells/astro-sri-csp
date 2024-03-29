import { defineConfig, passthroughImageService } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-shield.kindspells.dev',
	image: {
		service: passthroughImageService(),
	},
	integrations: [
		starlight({
			title: 'Astro-Shield Docs',
			defaultLocale: 'en',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			social: {
				github: 'https://github.com/kindspells/astro-shield',
			},
			sidebar: [
				{
					label: 'Start Here',
					items: [{ label: 'Getting Started', link: '/getting-started/' }],
				},
				{
					label: 'Guides',
					items: [
						{
							label: 'Subresource Integrity',
							autogenerate: {
								directory: 'guides/subresource-integrity',
							},
						},
						{
							label: 'Security Headers',
							autogenerate: {
								directory: 'guides/security-headers',
							},
						}
					],
				},
				{
					label: 'Other',
					items: [
						{
							label: 'Known Limitations',
							link: '/other/known-limitations/',
						},
						{
							label: 'Contributing',
							link: 'https://github.com/kindspells/astro-shield/blob/main/CONTRIBUTING.md',		
						},
					]
				},
				// {
				// 	label: 'Reference',
				// 	autogenerate: { directory: 'reference' },
				// },
			],
		}),
	],
})
