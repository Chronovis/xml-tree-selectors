import * as React from 'react'
import styled from '@emotion/styled'
import AddTransform from './add-transformer'
import ExcludeForm from './forms/exclude'
import ReplaceForm from './forms/replace'
import ChangeForm from './forms/change'
import SelectForm from './forms/select'

export const Wrapper = styled('div')`
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
`

interface Props {
	change: (transformers: XMLioTransformer[]) => void
	input: string
	transformers: XMLioTransformer[]
}
export default class Transformers extends React.Component<Props> {
	render() {
		return (
			<Wrapper>
				{
					this.props.transformers.map((transform, index) => {
						let Component
						if (transform.type === 'exclude') Component = ExcludeForm
						if (transform.type === 'replace') Component = ReplaceForm
						if (transform.type === 'change') Component = ChangeForm
						if (transform.type === 'select') Component = SelectForm

						return (
							<Component
								change={(transform) => this.updateTransformers(transform, index)}
								close={() => this.removeTransformer(index)}
								key={index}
								transform={transform}
							/>
						)
					})
				}
				{
					<AddTransform
						change={transform => {
							let nextTransform: XMLioTransformer
							if (transform === 'exclude') nextTransform = {
								selector: [],
								type: transform,
							}
							if (transform === 'replace') nextTransform = {
								sourceSelectorFunc: '',
								targetSelector: '',
								type: transform,
							}
							if (transform === 'change') nextTransform = {
								changeFunc: '',
								selector: '',
								type: transform,
							}
							if (transform === 'select') nextTransform = {
								selector: '',
								type: transform,
							}
							const transforms = this.props.transformers.concat(nextTransform)
							this.props.change(transforms)
						}}
					/>
				}
			</Wrapper>
		)
	}

	private async updateTransformers(transformer: XMLioTransformer, index: number) {
		const nextTransformer: XMLioTransformer = { ...this.props.transformers[index], ...transformer }
		const transformers = this.props.transformers
			.slice(0, index)
			.concat(nextTransformer)
			.concat(this.props.transformers.slice(index + 1))
		this.props.change(transformers)
	}

	private removeTransformer(index: number) {
		this.props.change(this.props.transformers.filter((_t, i) => i !== index))
	}
}