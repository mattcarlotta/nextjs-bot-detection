import { AgGridReact } from 'ag-grid-react'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'
import { useMemo } from 'react'
import checkBot from '../utils/checkBot'

const defaultColDef = {
  resizable: true,
  sortable: true
}

export default function Home({
  staff,
  isBot
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const columnDefs = useMemo(
    () => [
      { headerName: 'ID', field: 'id' },
      { headerName: 'First Name', field: 'first_name' },
      { headerName: 'Last Name', field: 'last_name' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Phone', field: 'phone' },
      { headerName: 'Offic', field: 'office' },
      { headerName: 'Job Title', field: 'job_title' }
    ],
    []
  )

  return (
    <main style={{ padding: '1rem 2.5rem' }}>
      <h1 style={{ padding: '1rem 0' }}>IsBot: {isBot.toString()}</h1>
      {isBot ? (
        <table>
          <thead>
            <tr>
              {columnDefs.map(({ headerName, field }) => (
                <th key={field}>{headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map((employee) => (
              <tr key={employee.id}>
                {Object.values(employee).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ height: '600px' }}>
          <AgGridReact
            defaultColDef={defaultColDef}
            rowData={staff}
            columnDefs={columnDefs}
            rowSelection="single"
            containerStyle={{ height: '100%', width: '100%' }}
          />
        </div>
      )}
    </main>
  )
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const isBot = checkBot(res.getHeaders())
  const staff = Array.from({ length: 3 }).map((_v, idx) => ({
    id: idx,
    first_name: `first${idx}`,
    last_name: `last${idx}`,
    email: `member${idx}@company.com`,
    phone: `12345${idx}`,
    office: `place${idx}`,
    job_title: `Worker${idx}`
  }))

  return { props: { staff, isBot } }
}
