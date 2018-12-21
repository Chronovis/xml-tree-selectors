import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as monaco from 'monaco-editor'
import Transformers from './transformers'
import TransformersPlaceholder from './transformers/placeholder'
import Output from './output'
import xml from './xml'
import Exporters from './exporters'
import ExportersPlaceholder from './exporters/placeholder'
import { Head, Main, H1, InputEditor, InputEditorPlaceholder, OutputEditorPlaceholder } from './index.components'

export interface Columns {
	input: boolean
	transformers: boolean
	exporters: boolean
	output: boolean
}
interface State {
	columns: Columns
	exporters: Exporter[]
	input: string
	transformers: XMLioTransformer[]
}
class App extends React.PureComponent<any, State> {
	editor

	state: State = {
		columns: {
			input: true,
			transformers: true,
			exporters: true,
			output: true,
		},
		exporters: [],
		input: xml,
		transformers: [{ type: 'exclude', selector: ['lb'] }],
	}

	componentDidMount() {
		this.initEditor()
	}

	componentDidUpdate(_prevProps, prevState: State) {
		if (prevState.columns !== this.state.columns) {
			this.editor.layout()
		}

		if (prevState.columns.input && !this.state.columns.input) {
			this.editor.dispose()
		}

		if (!prevState.columns.input && this.state.columns.input) {
			this.initEditor()
		}
	}

	render() {
		return (
			<Main columns={this.state.columns}>
				<H1>Bosporus</H1>
				<Head onClick={this.handleColumnClick('input')}>{ this.state.columns.input ? 'INPUT' : 'IN' }</Head>
				<Head onClick={this.handleColumnClick('transformers')}>{ this.state.columns.transformers ? 'TRANSFORMERS' : 'TRA' }</Head>
				<Head onClick={this.handleColumnClick('exporters')}>{ this.state.columns.exporters ? 'EXPORTERS' : 'EXP' }</Head>
				<Head onClick={this.handleColumnClick('output')}>{ this.state.columns.output ? 'OUTPUT' : 'OUT' }</Head>
				{
					this.state.columns.input ?
						<InputEditor id="input-editor" /> :
						<InputEditorPlaceholder onClick={this.handleColumnClick('input')} />
				}
				{
					this.state.columns.transformers ?
						<Transformers
							change={transformers => this.setState({ transformers })}
							input={this.state.input}
							transformers={this.state.transformers}
						/> :
						<TransformersPlaceholder
							onClick={this.handleColumnClick('transformers')} 
							transformers={this.state.transformers} 
						/>
				}
				{
					this.state.columns.exporters ?
						<Exporters
							change={exporters => this.setState({ exporters })}
							exporters={this.state.exporters}
						/> :
						<ExportersPlaceholder
							exporters={this.state.exporters} 
							onClick={this.handleColumnClick('exporters')} 
						/>
				}
				{
					this.state.columns.output ?
						<Output
							exporters={this.state.exporters}
							input={this.state.input}
							transformers={this.state.transformers}
						/> :
						<OutputEditorPlaceholder onClick={this.handleColumnClick('output')} />
				}
			</Main>
		)
	}

	private handleColumnClick = (column: string) => () => {
		const columns = {
			...this.state.columns,
			[column]: !this.state.columns[column]
		}
		this.setState({ columns })
	}

	private initEditor() {
		this.editor = monaco.editor.create(document.getElementById('input-editor'), {
			formatOnPaste: true,
			language: 'xml',
			scrollBeyondLastLine: false,
			value: this.state.input,
			wordWrap: 'on'
		})
		this.editor.onDidChangeModelContent(() => this.setState({ input: this.editor.getModel().getValue() }))
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container')
	ReactDOM.render(<App />, container)
});