import input from './xml'

const defaultState: ContextState = {
	columns: {
		input: true,
		transformers: true,
		exporters: true,
		output: true,
	},
	exporters: [{ active: true, type: 'xml' }],
	transformers: [{ active: true, type: 'select', selector: 'lb' }],
	input,
}

export default defaultState
