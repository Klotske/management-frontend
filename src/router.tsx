import { createBrowserRouter } from "react-router-dom"
import DepartmentsPage from "./routes/departments"
import Layout from "./routes/layout"
import PositionsPage from "./routes/positions"
const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'positions',
        element: <PositionsPage />
      },
      {
        path: 'departments',
        element: <DepartmentsPage />
      },
      {
        path: 'rates',
        element: <div>Rates</div>
      },
      {
        path: 'schedules',
        element: <div>Schedules</div>
      },
      {
        path: 'report',
        element: <div>Report</div>
      }
    ]
  }
])

export default Router