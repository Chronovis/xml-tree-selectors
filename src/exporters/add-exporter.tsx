import * as React from 'react'
import styled from "@emotion/styled"
import { XmlOption, DataOption, TextOption } from './buttons'
import { Button } from '../ui/button';

export const Wrapper = styled('div')`
	border: 4px dashed rgba(165, 42, 42, .${(props: State) => props.menu ? '8' : '4'});
	border-radius: 10px;
	padding: 1em;
`

export const Empty = styled(Button)`
	font-size: 1.5em;
	margin: 0;
`

interface Props {
	change: (exporterOptions: Exporter) => void
}
interface State {
	menu: boolean
}
export default class AddTransform extends React.PureComponent<Props, State> {
	state: State = {
		menu: false,
	}

	render() {
		return (
			<Wrapper menu={this.state.menu}>
				{
					!this.state.menu &&
					<Empty onClick={() => this.setState({ menu: true })}>Add exporter</Empty>
				}
				{
					this.state.menu &&
					<>
						<XmlOption onClick={() => this.handleOption({ type: 'xml' })}>XML</XmlOption>
						<DataOption onClick={() => this.handleOption({ type: 'data' })}>Data</DataOption>
						{/* <JsxOption onClick={() => this.handleOption({ type: 'jsx' })}>Change</JsxOption> */}
						<TextOption onClick={() => this.handleOption({ type: 'text' })}>Text</TextOption>
					</>
				}
			</Wrapper>
		)
	}

	handleOption(option: Exporter) {
		this.setState({ menu: false })
		this.props.change(option)
	}
}