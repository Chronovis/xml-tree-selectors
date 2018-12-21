import * as React from 'react'
import styled from '@emotion/styled';
import AddExporter from './add-exporter'
import XmlForm from './forms/xml'
import DataForm from './forms/data'
import TextForm from './forms/text'

export const Wrapper = styled('div')`
	grid-row-start: 3;
	grid-row-end: 4;
`

interface Props {
	change: (exporters: Exporter[]) => void
	exporters: Exporter[]
}
export default class Exporters extends React.PureComponent<Props> {
	render() {
		return (
			<Wrapper>
				{
					this.props.exporters.map((exporter, index) => {
						let Component
						if (exporter.type === 'xml') Component = XmlForm
						else if (exporter.type === 'data') Component = DataForm
						else if (exporter.type === 'text') Component = TextForm
						// else if (exporterOptions.type === 'jsx') Component = SelectForm

						return (
							<Component
								change={(exporter) => this.updateExporters(exporter, index)}
								close={() => this.removeExporter(index)}
								key={index}
								exporter={exporter}
							/>
						)
					})
				}
				<AddExporter
					change={exporter => this.props.change(this.props.exporters.concat(exporter))}
				/>
			</Wrapper>	
		)
	}

	private async updateExporters(exporter: Exporter, index: number) {
		const nextExporter: Exporter = { ...this.props.exporters[index], ...exporter }
		const exporters = this.props.exporters
			.slice(0, index)
			.concat(nextExporter)
			.concat(this.props.exporters.slice(index + 1))
		this.props.change(exporters)
	}

	private removeExporter(index: number) {
		this.props.change(this.props.exporters.filter((_t, i) => i !== index))
	}
}