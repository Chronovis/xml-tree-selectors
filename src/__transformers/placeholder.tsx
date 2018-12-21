import * as React from 'react'
import { Wrapper } from './index'
import styled from '@emotion/styled'
import { ChangeButton, SelectButton, ExcludeButton, ReplaceButton } from './buttons';

const EmptyWrapper = styled(Wrapper)`
	border: 4px dashed rgba(165, 42, 42, .4);
	border-radius: 10px;
	height: calc(100px + 2em);
`

interface Props {
	onClick: () => void
	transformers: XMLioTransformer[]
}
export default function(props: Props) {
	if (!props.transformers.length) return <EmptyWrapper onClick={props.onClick} />

	return (
		<Wrapper onClick={props.onClick}>
			{
				props.transformers.map((transformer, index) => {
					if (transformer.type === 'change') return <ChangeButton key={index} />
					if (transformer.type === 'select') return <SelectButton key={index} />
					if (transformer.type === 'exclude') return <ExcludeButton key={index} />
					if (transformer.type === 'replace') return <ReplaceButton key={index} />
				})
			}
		</Wrapper>
	)
}