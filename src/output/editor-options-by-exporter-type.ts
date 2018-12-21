const defaultOptions = {
	readOnly: true,
	scrollBeyondLastLine: false,
	wordWrap: 'on' as 'on'
}

export default {
	xml: {
		...defaultOptions,
		language: 'xml',
	},
	data: {
		...defaultOptions,
		language: 'json',
		wordWrap: 'off' as 'off'
	},

	text: {
		...defaultOptions,
		language: 'plaintext',
	}
}