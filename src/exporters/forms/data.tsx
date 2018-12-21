import * as React from 'react'
import { Form } from '../../ui/form';
// import styled from '@emotion/styled'
// import { exporterGray } from '../../css'
// import { FormWrapper, FormHeader } from '../../ui/form'

// const Wrapper = styled(FormWrapper)`
// 	${exporterGray}
// `

interface Props {
	change: (exporter: DataExporter) => void
	close: () => void
	exporter: DataExporter
}
export default class DataForm extends React.PureComponent<Props> {
	render() {
		return (
			<Form
				close={this.props.close}
				label="Data"
				type="exporter"
			/>
		)
	}
}