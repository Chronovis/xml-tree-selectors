import input from './xml2'

const defaultState: ContextState = {
	columns: {
		input: true,
		transformers: true,
		exporters: true,
		output: true,
	},
	// exporters: [{ active: true, type: 'xml' }],
	// transformers: [{ active: true, type: 'select', selector: 'lb' }],
	exporters: [],
	transformers: [],
	input,
}

export default defaultState
