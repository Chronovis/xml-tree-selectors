import * as React from 'react'
// import styled from '@emotion/styled'

// import { changePurple } from '../../css'
import MiniEditor from '../../ui/mini-editor'
import Button from '../../ui/button'
import Input from '../../ui/input'
import { Form } from '../../ui/form';

// import { FormWrapper, FormHeader } from '../../ui/form'

// const Wrapper = styled(FormWrapper)`
// 	${changePurple}
// `

interface Props {
	change: (transform: ChangeTransformer) => void
	close: () => void
	transform: ChangeTransformer
}
interface State {
	selector: string
	changeFunc: string
}
export default class ChangeForm extends React.PureComponent<Props, State> {
	inputRef: React.RefObject<HTMLInputElement>

	state: State = {
		selector: '',
		changeFunc: ''
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
				label="Change"
				type="change"
			>
				<Input
					onChange={(ev) => {
						this.setState({ selector: ev.currentTarget.value })
					}}
					placeholder="Selector for element(s) to change"
					ref={this.inputRef}
					style={{ marginBottom: '1em' }}
					value={this.state.selector}
				/>
				{
					this.state.selector.length > 0 &&
					<MiniEditor
						change={(changeFunc => this.setState({ changeFunc }))}
						initValue={`function changeFunc(target) {\n\treturn target\n}`}
					/>
				}
				{
					this.state.selector.length > 0 &&
					this.state.changeFunc.length > 0 &&
					<Button
						onClick={() => this.props.change({
							changeFunc: this.state.changeFunc,
							selector: this.state.selector,
							type: 'change'
						})}
					>
						Add change transform
					</Button>
				}
			</Form>
		)
	}
}