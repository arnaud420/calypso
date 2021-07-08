import React from 'react'
import { Layout } from '@ui-kitten/components'
import styles from './BorderedContainerStyles'

type Props = {
  children: Element|Element[]
}

const BorderedContainer = ({ children }: Props) => (
  <Layout style={styles.container}>
    {children}
  </Layout>
)

export default BorderedContainer
