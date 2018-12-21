import * as React from 'react'
import styled from '@emotion/styled'

// import { excludeBlue } from '../../css'
import Input from '../../ui/input'

import { Form } from '../../ui/form'

// const Wrapper = styled(FormWrapper)`
// 	${excludeBlue}
// `

const Exclude = styled('li')`
	background: #7272b3;
	border-radius: .5em;
	color: white;
	cursor: pointer;
	display: inline-block;
	font-weight: bold;
	margin: 0 .5em .5em 0;
	padding: .5em;
`

interface Props {
	change: (transform: ExcludeTransformer) => void
	close: () => void
	transform: ExcludeTransformer
}
interface State {
	active: boolean
	inputValue: string
}
export default class ExcludeForm extends React.PureComponent<Props, State> {
	inputRef: React.RefObject<HTMLInputElement>

	state: State = {
		active: true,
		inputValue: ''
	}

	constructor(props: Props) {
		super(props)
		this.inputRef = React.createRef()
	}

	componentDidMount() {
		this.inputRef.current.focus()
	}

	render() {
		return (
			<Form
				close={this.props.close}
				label="Exclude"
				type="exclude"
			>
				<Input
					onChange={(ev) => {
						this.setState({ inputValue: ev.currentTarget.value })
					}}
					onKeyDown={(ev) => {
						if (ev.keyCode === 13) {
							this.props.change({
								selector: this.props.transform.selector.concat(ev.currentTarget.value),
								type: 'exclude'
							})
							this.setState({ inputValue: '' })
						}
					}}
					ref={this.inputRef}
					value={this.state.inputValue}
				/>
				<ul style={{ marginTop: '1em' }}>
					{
						(this.props.transform.selector as string[]).map((exclude, index) =>
							<Exclude
								key={index}
								onClick={() => {
									this.props.change({
										selector: (this.props.transform.selector as string[]).filter(s => s !== exclude),
										type: 'exclude'
									})
								}}
							>
								{exclude}
							</Exclude>
						)
					}
				</ul>
			</Form>
		)
	}
}