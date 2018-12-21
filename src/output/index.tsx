import * as React from 'react'
import * as monaco from 'monaco-editor'
import styled from '@emotion/styled'
import Xmlio from 'xmlio'
import editorOptionsByExporterType from './editor-options-by-exporter-type'

const Wrapper = styled('div')`
	grid-row-start: 3;
	grid-row-end: 4;
`

const OutputEditor = styled('div')`
	height: 100%;
`

interface Props {
	input: string
	transformers: XMLioTransformer[]
	exporters: Exporter[]
}
interface State {
	activeExporter: number
	activePart: number
	output: (string[] | DataNode[])[]
}
export default class Output extends React.PureComponent<Props, State> {
	editor
	wrapperRef: React.RefObject<HTMLDivElement>

	state: State = {
		activeExporter: 0,
		activePart: 0,
		output: null
	}

	constructor(props: Props) {
		super(props)
		this.wrapperRef = React.createRef()
	}

	async componentDidUpdate(prevProps: Props, prevState: State) {
		if (!this.props.exporters.length) {
			console.log('no exporters')
			if (this.editor != null) {
				this.editor.dispose()
				this.editor = null
			}
			return
		}

		const prevExporter = prevProps.exporters[prevState.activeExporter]
		const thisExporter = this.props.exporters[this.state.activeExporter]

		if (prevProps.input !== this.props.input ||
			prevProps.transformers !== this.props.transformers ||
			prevExporter !== thisExporter
		) {
			console.log('gen output')
			const output = await this.generateOutput()

			if (this.editor == null || prevExporter.type !== thisExporter.type) {
				console.log('init editor')
				const editorOptions = editorOptionsByExporterType[thisExporter.type]
				this.editor = this.initEditor(editorOptions)
			}

			this.setState({ output })

			return
		}

		if (
			prevState.output !== this.state.output ||
			prevState.activePart !== this.state.activePart
		) {
			console.log('update editor')
			this.updateEditor()
		}
	}

	private updateEditor() {
		if (this.editor == null) return

		const model = this.editor.getModel()
		const output = this.state.output[this.state.activeExporter][this.state.activePart]

		if (model.getModeId() === 'json') {
			model.setValue(JSON.stringify(output))
			this.editor.getAction('editor.action.formatDocument').run()
		} else {
			model.setValue(output)
		}
	}

	render() {
		return (
			<Wrapper ref={this.wrapperRef}>
				<OutputEditor id="output-editor" />
			</Wrapper>
		)
	}

	private initEditor(options: any = {}) {
		if (this.editor != null) this.editor.dispose()
		return monaco.editor.create(document.getElementById('output-editor'), options)
	}

	private async generateOutput(): Promise<any[][]> {
		const xmlio = new Xmlio(this.props.input, { namespaces: ['af'] })
		const transformed = this.props.transformers.reduce((prev, curr) => {
			xmlio.addTransform(curr)
			return prev
		}, xmlio)
		let output = await transformed.export(this.props.exporters) as any

		if (!Array.isArray(output)) output = [[output]]
		else if (!output.length) return
		return output.map((o: any) => Array.isArray(o) ? o : [o])
	}
}

			// <Wrapper ref={this.wrapperRef}>
			// 	<Tabs
			// 		onChange={(tab) => console.log(tab)}
			// 		activeTab={this.props.exporters[0].type}
			// 	>
			// 		{
			// 			this.state.output.map((outputValue, outputIndex) =>
			// 				<Tab
			// 					key={this.props.exporters[outputIndex].type}
			// 					label={this.props.exporters[outputIndex].type}
			// 				>
			// 					<ul
			// 						style={{ height: this.state.output.length > 1 ? '100%' : '0' }}
			// 					>
			// 						{
			// 							outputValue.length &&
			// 							// @ts-ignore
			// 							outputValue.map((partValue: string | DataNode, partIndex: number) =>
			// 								<Part
			// 									active={this.state.activePart === partIndex}
			// 									containerHeight={this.wrapperRef.current.clientHeight}
			// 									exporter={this.props.exporters[outputIndex]}
			// 									index={partIndex}
			// 									key={partIndex}
			// 									onClick={() => this.setState({ activePart: partIndex })}
			// 									partCount={this.state.output[outputIndex].length}
			// 									value={partValue}
			// 								/>
			// 							)

			// 						}
			// 					</ul>
			// 					{
			// 						this.state.output.length === 1 &&
			// 						<OutputEditor id="output-editor" />
			// 					}
			// 				</Tab>
			// 			)
			// 		}
			// 	</Tabs>
			// </Wrapper>