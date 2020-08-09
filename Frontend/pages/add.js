import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ADD_TOOL } from '../graphql/tools'
import { withApollo } from '../libs/apollo'
import styles from '../styles/Home.module.css'

const AddTools = () => {
  const router = useRouter()

  const [toolName, setToolName] = useState('')
  const [checkDev, setcheckDev] = useState(false)
  const [checkDesign, setcheckDesign] = useState(false)
  const [checkBusiness, setcheckBusiness] = useState(false)
  const [checkOperation, setcheckOperation] = useState(false)

  const [addTool, { data }] = useMutation(ADD_TOOL)

  const submitForm = (e) => {
    e.preventDefault()
    addTool({
      variables: {
        name: toolName,
        isDev: checkDev,
        isDesign: checkDesign,
        isBusiness: checkBusiness,
        isOperation: checkOperation,
      },
    })
    router.push('/')
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.description}>Adding new tool</p>
        <div className={styles.grid}>
          <form onSubmit={(e) => submitForm(e)}>
            <label for="name">Tools Name</label>{' '}
            <input
              type="text"
              name="name"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
            />
            <p>Select the department that the tool associate with:</p>
            <input
              type="checkbox"
              name="dev"
              checked={checkDev}
              onChange={() => {
                setcheckDev(!checkDev)
              }}
            />
            <label for="dev"> Development</label>
            <input
              type="checkbox"
              name="design"
              value={checkDesign}
              onChange={() => setcheckDesign(!checkDesign)}
            />
            <label for="design"> Design</label>
            <input
              type="checkbox"
              name="business"
              value={checkBusiness}
              onChange={() => setcheckBusiness(!checkBusiness)}
            />
            <label for="business"> Business</label>
            <input
              type="checkbox"
              name="operation"
              value={checkOperation}
              onChange={() => setcheckOperation(!checkOperation)}
            />
            <label for="operation"> Operation</label>
            <br />
            <button className={styles.button} type="submit">
              Save
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default withApollo()(AddTools)
