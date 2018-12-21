import * as React from 'react'
import { Wrapper } from './index'
import styled from '@emotion/styled'
import { XmlOption } from './buttons'

const EmptyWrapper = styled(Wrapper)`
	border: 4px dashed rgba(165, 42, 42, .4);
	border-radius: 10px;
	height: calc(100px + 2em);
`

interface Props {
	onClick: () => void
	exporters: Exporter[]
}
export default function(props: Props) {
	if (!props.exporters.length) return <EmptyWrapper onClick={props.onClick} />

	return (
		<Wrapper onClick={props.onClick}>
			{
				props.exporters.map((_exporter, index) => <XmlOption key={index} />)
			}
		</Wrapper>
	)
}