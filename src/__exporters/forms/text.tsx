import * as React from 'react'
// import styled from '@emotion/styled'
// import { exporterGray } from '../../css'
import { Form } from '../../ui/form'

// const Wrapper = styled(FormWrapper)`
// 	${exporterGray}
// `

interface Props {
	change: (exporter: TextExporter) => void
	close: () => void
	exporter: TextExporter
}
export default class TextForm extends React.PureComponent<Props> {
	render() {
		return (
			<Form
				close={this.props.close}
				label="Text"
				type="exporter"
			/>
		)
	}
}