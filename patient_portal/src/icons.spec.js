import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { getIcons } from 'frappe-ui/vite/lucideIconsPlugin'

// frappe-ui's resolver renders a placeholder for an unknown lucide name and
// only warns at build time, so a typo or a renamed icon must fail here.
const sources = fs
	.readdirSync(__dirname, { recursive: true })
	.filter((file) => /\.(vue|js)$/.test(file) && !file.endsWith('.spec.js'))
	.map((file) => fs.readFileSync(path.join(__dirname, file), 'utf8'))
	.join('\n')

const imported = [...sources.matchAll(/~icons\/lucide\/([a-z0-9-]+)/g)].map((m) => m[1])
const classIcons = [...sources.matchAll(/["'\s]lucide-([a-z0-9-]+)/g)].map((m) => m[1])

describe('lucide icons', () => {
	const known = new Set(Object.keys(getIcons()))

	it('imports only names lucide ships', () => {
		expect(imported.length).toBeGreaterThan(0)
		expect(imported.filter((name) => !known.has(name))).toEqual([])
	})

	it('uses only lucide class icons that exist', () => {
		expect(classIcons.filter((name) => !known.has(name))).toEqual([])
	})

	it('no longer uses the removed FeatherIcon', () => {
		expect(sources).not.toMatch(/FeatherIcon/)
	})
})
