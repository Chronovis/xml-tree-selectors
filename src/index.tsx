import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as monaco from 'monaco-editor'
import Handlers from './handlers'
import HandlersPlaceholder from './handlers/placeholder'
import Output from './output'
import { Head, Main, H1, InputEditor, InputEditorPlaceholder, OutputEditorPlaceholder } from './index.components'
import defaultState from './state'

class App extends React.PureComponent<any, ContextState> {
	editor: any
	state: ContextState = defaultState

	componentDidMount() {
		this.initEditor()
	}

	componentDidUpdate(_prevProps, prevState: ContextState) {
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
						<Handlers
							change={(transformers: XMLioTransformer[]) => this.setState({ transformers })}
							handlers={this.state.transformers}
							type="transformers"
						/> :
						<HandlersPlaceholder
							onClick={this.handleColumnClick('transformers')} 
							handlers={this.state.transformers} 
						/>
				}
				{
					this.state.columns.exporters ?
						<Handlers
							change={(exporters: Exporter[]) => this.setState({ exporters })}
							handlers={this.state.exporters}
							type="exporters"
						/> :
						<HandlersPlaceholder
							handlers={this.state.exporters} 
							onClick={this.handleColumnClick('exporters')} 
						/>
				}
				{
					this.state.columns.output ?
						<Output {...this.state} /> :
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