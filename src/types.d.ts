declare interface FormProps<T> {
	change: (handlerProps: Partial<T>) => void
	close: () => void
	handler: T
}

declare interface Columns {
	input: boolean
	transformers: boolean
	exporters: boolean
	output: boolean
}

declare interface ContextState {
	columns: Columns
	exporters: Exporter[]
	transformers: XMLioTransformer[]
	input: string
}