import * as React from 'react'
import * as monaco from 'monaco-editor'
import styled from 'react-emotion'
import xml from './xml'
import XMLTree from './xml-tree'
import { xmlToTree, SaxTag } from 'xmlio';
import { compareTreeToSelector } from 'xml-selector'
import debounce from 'lodash.debounce'

const Main = styled('div')`
	display: grid;
	grid-template-rows: 10% 10% 80%;
	grid-template-columns: 50% 50%;
	height: 100%;
	width: 100%;
`

const Heading1 = styled('h1')`
	grid-column-start: 1;
	grid-column-end: 3;
	padding-left: 2em;
`

const Input = styled('input')`
	border: 1px solid black;
	font-size: 2em;
	grid-column-end: 3;
	grid-column-start: 1;
	margin: 0 1em .5em 1em;
	outline: none;
	padding-left: 1em;
`

const Editor = styled('div')`
	height: 100%;
`

interface State {
	selector: string
	tree: SaxTag
}
export default class App extends React.PureComponent<null, State> {
	state: State = {
		selector: '',
		tree: null
	}

	async componentDidMount() {
		const editor = monaco.editor.create(document.getElementById('editor'), {
			value: xml,
			language: 'xml'
		});

		const handleKeyUp = debounce(async () => {
			const xml = editor.getModel().getValue()
			let no = 1
			const tree = await xmlToTree(xml, {
				setCustomValues: () => ({ order: no++ })
			})
			this.setState({ tree })
		}, 2000)
		editor.onKeyUp(handleKeyUp)

		let no = 1
		const tree = await xmlToTree(xml, {
			setCustomValues: () => ({ order: no++ })
		})
		this.setState({ tree  })
	}

	componentDidUpdate(_prevProps, prevState) {
		if (prevState.selector !== this.state.selector) {
			const tree = JSON.parse(JSON.stringify(this.state.tree))
			this.setState({
				tree: compareTreeToSelector(tree, this.state.selector)
			})
		}
	}

	render() {
		return (
			<Main>
				<Heading1>XML tree selectors!</Heading1>
				<Input onChange={(ev) => this.setState({ selector: ev.target.value })} value={this.state.selector} />
				<Editor id="editor" />
				<XMLTree
					updateSelector={(selector) => this.setState({ selector })}
					tree={this.state.tree}
				/>
			</Main>
		)
	}
}