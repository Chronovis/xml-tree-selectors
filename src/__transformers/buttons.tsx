import styled from "@emotion/styled"
import { excludeBlue, replaceOrange, selectGreen, changePurple } from '../css'
import { Button } from '../ui/button'

export const ExcludeButton = styled(Button)`
	${excludeBlue}
`

export const ReplaceButton = styled(Button)`
	${replaceOrange}
`

export const SelectButton = styled(Button)`
	${selectGreen}
`

export const ChangeButton = styled(Button)`
	${changePurple}
`