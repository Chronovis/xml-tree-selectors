import styled from '@emotion/styled'

export const Main = styled('div')`
	box-sizing: border-box;
	display: grid;
	grid-column-gap: 2%;
	grid-template-rows: 10% 5% 82%;
	grid-template-columns: ${(props: { columns: Columns }) => {
		const closedColumnWidth = 5
		const closedColumns = Object.keys(props.columns).reduce((prev, curr) => prev + (props.columns[curr] ? 0 : 1), 0)
		const gapSpace = 2 * 3
		const availableSpace = 100 - gapSpace - (closedColumns * closedColumnWidth) // percentage
		const spacePerColumn = availableSpace / (4 - closedColumns) // percentage
		return Object.keys(props.columns).map(column => props.columns[column] ? `${spacePerColumn}%` : `${closedColumnWidth}%`).join(' ')
	}};
	height: 100%;
	padding: 0 2%;
	transition: all 1s;
	width: 100%;
`

export const H1 = styled('h1')`
	grid-column-start: 1;
	grid-column-end: 5;
	padding-left: 2em;
`

export const Editor = styled('div')`
	height: 100%;
`

export const EditorWrapper = styled(Editor)`
	background: white;
	border-radius: 1em;
	box-sizing: border-box;
	padding: 1em .5em;

	& > div {
		height: 100%;
	}
`

export const InputEditorWrapper = styled(EditorWrapper)`
	grid-column-end: 2;
	grid-column-start: 1;
	grid-row-end: 4;
	grid-row-start: 3;
`

export const InputEditorPlaceholder = styled(EditorWrapper)`
	background-color: lightgray;
	cursor: pointer;
`

export const OutputEditorPlaceholder = styled(InputEditorPlaceholder)`
	grid-column-start: 4;
	grid-column-end: 5;

`

export const Head = styled('div')`
	font-weight: bold;
	text-align: center;
`