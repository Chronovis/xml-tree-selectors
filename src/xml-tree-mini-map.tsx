import * as React from 'react'
import { SaxTag } from 'xmlio'
import { treeToList } from 'xml2tree'
import styled from 'react-emotion';

const List = styled('ul')`
	display: grid;
`

interface ItemProps {
	active: boolean
}
const Item = styled('li')`
	background: ${(props: ItemProps) => props.active ? 'yellow' : null }
`

interface Props {
	tree: SaxTag
}
export default class XMLTreeMiniMap extends React.PureComponent<Props> {
	render() {
		const list = treeToList(this.props.tree)
		return (
			<List>
				{
					list.map(item =>
						<Item active={item.custom.match} key={item.id} />
					)
				}
			</List>
		)
	}
}