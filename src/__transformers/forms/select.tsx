import * as React from 'react'
// import styled from '@emotion/styled'

// import { selectGreen } from '../../css'
import Button from '../../ui/button'
import Input from '../../ui/input'

import { Form } from '../../ui/form'

// const Wrapper = styled(FormWrapper)`
// 	${selectGreen}
// `

interface Props {
	change: (transform: SelectTransformer) => void
	close: () => void
	transform: SelectTransformer
}
interface State {
	selector: string
}
export default class SelectForm extends React.PureComponent<Props, State> {
	inputRef: React.RefObject<HTMLInputElement>

	state: State = {
		selector: this.props.transform.selector,
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
				label="Select"
				type="select"
			>
				<Input
					onChange={(ev) => {
						this.setState({ selector: ev.currentTarget.value })
					}}
					onKeyDown={(ev) => {
						if (ev.keyCode === 13) {
							this.props.change({
								selector: this.state.selector,
								type: 'select'
							})
						}
					}}
					placeholder="Selector for element(s) to select"
					ref={this.inputRef}
					style={{ marginBottom: '1em' }}
					value={this.state.selector}
				/>
				{
					this.state.selector.length > 0 &&
					<Button
						onClick={() => this.props.change({
							selector: this.state.selector,
							type: 'select'
						})}
					>
						Add select transform
					</Button>
				}
			</Form>
		)
	}
}