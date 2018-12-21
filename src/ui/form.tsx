import * as React from 'react'
import styled from "@emotion/styled"
import { excludeBlue, changePurple, replaceOrange, exporterGray, selectGreen, inactiveGray } from '../css';

const FormWrapper = styled('div')`
	border-radius: 10px;
	margin-bottom: 1em;
	padding: 1em;

	${(props: { active: boolean, type: string }) => {
		if (!props.active) return inactiveGray
		if (props.type === 'exclude') return excludeBlue
		if (props.type === 'change') return changePurple
		if (props.type === 'select') return selectGreen
		if (props.type === 'replace') return replaceOrange
		if (props.type === 'exporter') return exporterGray
	}}
`

const FormHeaderWrapper = styled('h2')`
	margin: 0 0 1em 0;
	padding: 0;
	position: relative;
	text-align: center;
`

const ControlButtons = styled('div')`
	background-color: rgba(0, 0, 0, .15);
	border-radius: .5em;
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: .2em;
	position: absolute;
	right: 0;
	top: 0;
	transform: scale(.4);
	transform-origin: top right;
`

const Toggle = styled('div')`
	background-color: rgba(255, 255, 255, .25);
	border-radius: .5em;
	cursor: pointer;
	padding: .2em;
	position: relative;
	width: 2em;

	& > div {
		left: ${(props: { active: boolean }) => props.active ? 26 : 6}px;
		background-color: rgba(0, 0, 0, .4);
		border-radius: .5em;
		height: 1em;
		position: absolute; 
		transition: left 150ms;
		width: 1em;
	}
`

const Close = styled('div')`
	cursor: pointer;
	font-size: 1.2em;
	transform: scale(1.2);
`

interface FormHeaderProps {
	active: boolean
	label: string
	toggle: () => void
	close: () => void
}
export class FormHeader extends React.PureComponent<FormHeaderProps> {
	render() {
		return (
			<FormHeaderWrapper>
				{this.props.label}
				<ControlButtons>
					<Toggle
						active={this.props.active}
						onClick={this.props.toggle}
					>
						<div />
					</Toggle>
					<Close onClick={this.props.close}>✖</Close>	
				</ControlButtons>
			</FormHeaderWrapper>
		)
	}
}

export interface FormProps {
	children?: any
	close: () => void
	label: string
	type: 'exclude' | 'replace' | 'change' | 'select' | 'exporter'
}
interface FormState {
	active: boolean
}
export class Form extends React.PureComponent<FormProps, FormState> {
	state: FormState = {
		active: true
	}

	render() {
		return (
			<FormWrapper
				active={this.state.active}
				type={this.props.type}
			>
				<FormHeader
					active={this.state.active}
					close={this.props.close}
					label={this.props.label}
					toggle={() => this.setState({ active: !this.state.active })}
				/>
				{
					this.state.active &&
					this.props.children
				}
			</FormWrapper>
		)
	}
}