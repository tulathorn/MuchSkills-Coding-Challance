import { withApollo } from '../../libs/apollo'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { TOOL } from '../../graphql/tools'
import styles from '../../styles/Home.module.css'

const EditTool = (props) => {
  const router = useRouter()
  const { id } = router.query
  console.log('id', id)

  const { loading, error, data } = useQuery(TOOL, {
    variables: { id },
  })
  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>
  if (data) console.log('data', data)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.description}>Adding new tool</p>
        <div className={styles.grid}>
          <p>test</p>
        </div>
      </main>
    </div>
  )
}

export default withApollo()(EditTool)
