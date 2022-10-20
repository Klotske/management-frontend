import { createBrowserRouter } from "react-router-dom"
import Layout from "./routes/layout"
const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'positions',
        element: <div>Positions</div>
      },
      {
        path: 'departments',
        element: <div>Departments</div>
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