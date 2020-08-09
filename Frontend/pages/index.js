import Head from 'next/head'
import { withApollo } from '../libs/apollo'
import { useQuery } from '@apollo/client'
import { TOOLS } from '../graphql/tools'
import styles from '../styles/Home.module.css'

const Home = () => {
  const { loading, error, data } = useQuery(TOOLS)
  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>
  if (data) console.log('data', data.tools)

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
          <button onClick={(e) => console.log(e)}>Add new toools</button>
        </div>

        <div className={styles.grid}>
          {/* <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a> */}
          {data.tools.map((data) => {
            return (
              <div className={styles.card}>
                <h3>{data.name}</h3>
                <p>Associated with:</p>
                {data.departments.map((element) => (
                  <p>{element.name}</p>
                ))}
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
