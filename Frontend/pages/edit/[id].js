import { useState, useEffect } from 'react'
import { withApollo } from '../../libs/apollo'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { TOOL, EDIT_TOOL } from '../../graphql/tools'
import styles from '../../styles/Home.module.css'

const EditTool = (props) => {
  const router = useRouter()
  const { id } = router.query

  const [editTool, { data2 }] = useMutation(EDIT_TOOL)
  // const [_id, setId] = useState(undefined)
  const [toolName, setToolName] = useState(undefined)
  const [checkDev, setcheckDev] = useState(undefined)
  const [checkDesign, setcheckDesign] = useState(undefined)
  const [checkBusiness, setcheckBusiness] = useState(undefined)
  const [checkOperation, setcheckOperation] = useState(undefined)
  useEffect(function checkData() {
    if (data) {
      console.log(data.tool)
      console.log(toolName)
      console.log(checkDev)
      console.log(checkDesign)
      console.log(checkBusiness)
      console.log(checkOperation)
    }
  })

  const { loading, error, data } = useQuery(TOOL, {
    variables: { id },
  })
  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>

  const submitForm = (e) => {
    console.log('id', id)
    e.preventDefault()
    editTool({
      variables: {
        id,
        name: toolName,
        isDev: checkDev,
        isDesign: checkDesign,
        isBusiness: checkBusiness,
        isOperation: checkOperation,
      },
    })
    router.push('/')
  }

  const handleChangeDev = (state) => {
    setcheckDev(!state)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.description}>Edit information</p>
        <div className={styles.grid}>
          <div className={styles.box} ล>
            <h3>{data.tool.name}</h3>
            <p>Associated with:</p>
            {data.tool.isDev && <p>Development</p>}
            {data.tool.isDesign && <p>Design</p>}
            {data.tool.isBusiness && <p>Business</p>}
            {data.tool.isOperation && <p>Operation</p>}
          </div>
          <div>
            <h3>Editing data here</h3>
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
                onChange={() => setcheckDev(!checkDev)}
              />
              <label for="dev"> Development</label>
              <input
                type="checkbox"
                name="design"
                value={checkDesign}
                onChange={(e) => setcheckDesign(!checkDesign)}
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
                Edit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default withApollo()(EditTool)
