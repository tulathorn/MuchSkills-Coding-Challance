import Head from 'next/head'
import { useRouter } from 'next/router'
import { withApollo } from '../libs/apollo'
import { useQuery } from '@apollo/client'
import { TOOLS } from '../graphql/tools'
import styles from '../styles/Home.module.css'

const Home = () => {
  const router = useRouter()
  const { loading, error, data } = useQuery(TOOLS)
  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>
  if (data) console.log('data', data)

  return (
    <div className={styles.container}>
      <Head>
        <title>MuchSkill Tools Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>MuchSkill Tools management</h1>
        <p className={styles.description}>Finding your tools that you need here</p>

        <div className={styles.grid}>
          <button
            onClick={() => {
              router.push('/add')
            }}
          >
            Add new toools
          </button>
        </div>

        <div className={styles.grid}>
          {data.newTools.map((data) => {
            return (
              <div
                className={styles.card}
                onClick={() => router.push('/edit/[id]', `/edit/${data._id}`)}
              >
                <h3>{data.name}</h3>
                <p>Associated with:</p>
                {data.isDev && <p>Development</p>}
                {data.isDesign && <p>Design</p>}
                {data.isBusiness && <p>Business</p>}
                {data.isOperation && <p>Operation</p>}
              </div>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default withApollo()(Home)
