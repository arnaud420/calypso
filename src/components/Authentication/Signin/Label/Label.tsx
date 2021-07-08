import React from 'react'
import Text from '../../../Common/Text'

type Props = {
  text: string
}

const Label = ({ text }: Props) => (
  <Text category="s2" appearance="alternative" style={{ marginBottom: 2 }}>{text}</Text>
)

export default Label
