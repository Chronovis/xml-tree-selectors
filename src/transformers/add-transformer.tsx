import * as React from 'react'
import { Empty, Wrapper } from '../exporters/add-exporter';
import { ExcludeButton, ReplaceButton, ChangeButton, SelectButton } from './buttons'

interface Props {
	change: (transformType: TransformerType) => void
}
interface State {
	menu: boolean
}
export default class AddTransformer extends React.PureComponent<Props, State> {
	state: State = {
		menu: false,
	}

	render() {
		return (
			<Wrapper menu={this.state.menu}>
				{
					!this.state.menu &&
					<Empty onClick={() => this.setState({ menu: true })}>Add transformer</Empty>
				}
				{
					this.state.menu &&
					<>
						<ExcludeButton onClick={() => this.handleOption('exclude')}>Exclude</ExcludeButton>
						<ReplaceButton onClick={() => this.handleOption('replace')}>Replace</ReplaceButton>
						<ChangeButton onClick={() => this.handleOption('change')}>Change</ChangeButton>
						<SelectButton onClick={() => this.handleOption('select')}>Select</SelectButton>
					</>
				}
			</Wrapper>
		)
	}

	handleOption(option: TransformerType) {
		this.setState({ menu: false })
		this.props.change(option)
	}
}