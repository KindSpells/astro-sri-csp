import { describe, expect, it } from 'vitest'

import type { NetlifyHeadersRawConfig } from '../netlify.mts'
import { parseNetlifyHeadersConfig } from '../netlify.mts'

describe('parseNetlifyHeadersConfig', () => {
	const testEntries = [
		{ comment: '# This is a test config file' },
		'',
		{
			path: '/index.html',
			entries: [
				{ comment: '# Nested Comment' },
				{ headerName: 'X-Frame-Options', value: 'DENY' },
				{ headerName: 'X-XSS-Protection', value: '1; mode=block' },
			],
		},
		{
			path: '/es/index.html',
			entries: [
				{ headerName: 'X-Frame-Options', value: 'DENY' },
				{ headerName: 'X-XSS-Protection', value: '1; mode=block' },
			],
		},
		'',
	] satisfies NetlifyHeadersRawConfig['entries']

	it('parses a valid config (tabs)', () => {
		const config = `# This is a test config file

/index.html
	# Nested Comment
	X-Frame-Options: DENY
	X-XSS-Protection: 1; mode=block
/es/index.html
	X-Frame-Options: DENY
	X-XSS-Protection: 1; mode=block
`
		const parsed = parseNetlifyHeadersConfig(config)
		expect(parsed).toEqual({
			indentWith: '\t',
			entries: testEntries,
		} satisfies NetlifyHeadersRawConfig)
	})

	it('parses a valid config (spaces)', () => {
		const config = `# This is a test config file

/index.html
  # Nested Comment
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
/es/index.html
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
`
		const parsed = parseNetlifyHeadersConfig(config)
		expect(parsed).toEqual({
			indentWith: '  ',
			entries: testEntries,
		} satisfies NetlifyHeadersRawConfig)
	})

	it('raises an error for empty page configs', () => {
		const config = `/index.html
  # Nested Comment
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
/fr/index.html
/es/index.html
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
`

		expect(() => parseNetlifyHeadersConfig(config)).toThrowError(
			'Bad syntax (line 5)',
		)
	})

	it('raises an error for changing indentation', () => {
		const config = `/index.html
  # Nested Comment
	X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
`

		expect(() => parseNetlifyHeadersConfig(config)).toThrowError(
			'Unexpected indentation (line 2)',
		)
	})
})