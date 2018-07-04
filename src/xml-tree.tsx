import * as React from 'react'
import { SaxTag } from 'xmlio'
import styled from 'react-emotion';
import XMLTreeMiniMap from './xml-tree-mini-map';

const Wrapper = styled('div')`
	display: grid;
	grid-template-columns: 90% 10%;
`

interface Props {
	updateSelector: (nextSelector: string) => void
	tree: SaxTag
}
export default class XMLTree extends React.PureComponent<Props> {
	render() {
		return (
			<Wrapper>
				{
					this.renderTree(this.props.tree)
				}
				<XMLTreeMiniMap tree={this.props.tree} />
			</Wrapper>
		)
	}

	private renderTree = (node) => {
		if (node == null) return null

		return (
			<Node
				key={node.id}
			>
				<NodeDef
					active={node.hasOwnProperty('custom') && node.custom.match}
					onClick={() => this.nodeToSelector(node)}
				>
					<span>
						&lt;	
					</span>
					<Link onClick={(ev) => {
						ev.stopPropagation()
						this.props.updateSelector(node.name)
					}}>
						{node.name}
					</Link>
					{
						Object.keys(node.attributes).map(key =>
							<Attribute
								attrKey={key}
								attrValue={node.attributes[key]}
								key={key}
								updateSelector={this.props.updateSelector}
							/>
						)
					}
					<span>
						&gt;	
					</span>
				</NodeDef>
				{
					Array.isArray(node.children) &&
					<ul style={{ margin: 0, paddingLeft: '2em' }}>
						{node.children
							.filter(c => typeof c !== 'string')
							.map(this.renderTree)}
					</ul>
				}
			</Node>
		)
	}

	private nodeToSelector(node: SaxTag) {
		const attributes = Object.keys(node.attributes)
			.map(key => `[${key}="${node.attributes[key]}"]`)
			.join('')
		const selector = `${node.name}${attributes}`
		this.props.updateSelector(selector)
	}
}

const Node = styled('li')`
	overflow: auto;
`

const StyledAttribute = styled('div')`
	color: gray;
	display: inline-block;
	font-size: .8em;
	margin: 0 .3em;

	& > div {
		display: inline-block;
	}

	&:before {
		content: '[';
	}

	&:after {
		content: ']';
	}
`

const Link = styled('div')`
	cursor: pointer;
	display: inline-block;

	&:hover {
		text-decoration: underline;
	}
`

interface AttrProps {
	attrKey: string
	attrValue: string
	updateSelector: (s: string) => void
}
const Attribute = (props: AttrProps) =>
	<StyledAttribute>
		<Link onClick={(ev) => {
			ev.stopPropagation()
			props.updateSelector(`[${props.attrKey}]`)
		}}>
			{props.attrKey}
		</Link>
		<div>=</div>
		<Link onClick={(ev) => {
			ev.stopPropagation()
			props.updateSelector(`[=${props.attrValue}]`)
		}}>
			"{props.attrValue}"
		</Link>
	</StyledAttribute>

interface LabelProps {
	active: boolean
}
const NodeDef = styled('div')`
	background: ${(props: LabelProps) => props.active ? 'yellow' : 'none'};
	font-size: 1.3em;
	white-space: nowrap;
`