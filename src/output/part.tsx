import * as React from 'react'
import styled from '@emotion/styled'
import * as monaco from 'monaco-editor'
import editorOptionsByExporterType from './editor-options-by-exporter-type'

const Wrapper = styled('li')`
	background: lightgray;
	border-radius: 10px;
	color: #444;
	cursor: pointer;
	font-size: 1.2em;
	line-height: 2em;
	margin-bottom: 20px;
`

const Header = styled('header')`
	height: 40px;
	text-align: center;
`

const Count = styled('div')`
	display: inline-block;
	border-radius: 1em;
	background: white;
	height: 1.4em;
	line-height: 1.4em;
	width 1.4em;
	margin-top: .4em;
`

interface Props {
	active: boolean
	containerHeight: number
	exporter: Exporter
	index: number
	onClick: () => void
	partCount: number
	value: string | DataNode
}
export default class Part extends React.PureComponent<Props> {
	editor

	componentDidUpdate(prevProps: Props) {
		if (!prevProps.active && this.props.active) {
			const value = typeof this.props.value === 'string' ? this.props.value : JSON.stringify(this.props.value)
			const el = document.getElementById(`part-editor-${this.props.index}`)
			const editorOptions = editorOptionsByExporterType[this.props.exporter.type]
			this.editor = monaco.editor.create(el, {
				scrollBeyondLastLine: false,
				value,
				...editorOptions,
			})
			let height = this.props.containerHeight - (this.props.partCount * 60)
			const lineCount = this.editor.getModel().getLineCount()
			if (height < lineCount * 20) {
				height = lineCount * 20
				if (height > 200) height = 200
			}
			el.style.height = `${height}px`
			this.editor.layout()
		}
	}

	render() {
		return (
			<Wrapper
				onClick={this.props.onClick}
			>
				<Header>
					<Count>{this.props.index + 1}</Count>
				</Header>
				{
					this.props.active &&
					<div id={`part-editor-${this.props.index}`} />
				}
			</Wrapper>
		)
	}
}