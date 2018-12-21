import * as React from 'react'
import { Form } from '../../ui/form';
// import styled from '@emotion/styled'
// import { exporterGray } from '../../css'
// import { FormWrapper, FormHeader } from '../../ui/form'

// const Wrapper = styled(FormWrapper)`
// 	${exporterGray}
// `

interface Props {
	change: (exporter: XmlExporter) => void
	close: () => void
	exporter: XmlExporter
}
export default class XmlForm extends React.PureComponent<Props> {
	render() {
		return (
			<Form
				close={this.props.close}
				label="Xml"
				type="exporter"
			/>
		)
	}
}