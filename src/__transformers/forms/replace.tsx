import * as React from 'react'
// import styled from '@emotion/styled'

// import { replaceOrange } from '../../css'
import StringOrFunction from '../../ui/string-or-function'
import Button from '../../ui/button'
import Input from '../../ui/input'

import { Form } from '../../ui/form'

// const Wrapper = styled(FormWrapper)`
// 	${replaceOrange}
// `

interface Props {
	change: (transform: ReplaceTransformer) => void
	close: () => void
	transform: ReplaceTransformer
}
interface State {
	targetSelector: string
	sourceSelectorFunc: string
}
export default class ReplaceForm extends React.PureComponent<Props, State> {
	inputRef: React.RefObject<HTMLInputElement>

	state: State = {
		targetSelector: this.props.transform.targetSelector,
		sourceSelectorFunc: this.props.transform.sourceSelectorFunc
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
				label="Replace"
				type="replace"
			>
				<Input
					onChange={(ev) => {
						this.setState({ targetSelector: ev.currentTarget.value })
					}}
					placeholder="Selector for element(s) to replace"
					ref={this.inputRef}
					value={this.state.targetSelector}
				/>
				{
					this.state.targetSelector.length > 0 &&
					<StringOrFunction change={(sourceSelectorFunc => this.setState({ sourceSelectorFunc }))} />
				}
				{
					this.state.targetSelector.length > 0 &&
					this.state.sourceSelectorFunc.length > 0 &&
					<Button
						onClick={() => this.props.change({
							removeSource: true,
							sourceSelectorFunc: this.state.sourceSelectorFunc,
							targetSelector: this.state.targetSelector,
							type: 'replace'
						})}
					>
						Add replace transform
					</Button>
				}
			</Form>
		)
	}
}