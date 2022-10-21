import { createBrowserRouter } from "react-router-dom"

import DepartmentsPage from "./routes/departments"
import Layout from "./routes/layout"
import PositionsPage from "./routes/positions"
import RatesPage from "./routes/rates"
import ReportPage from "./routes/report"
import SchedulesPage from "./routes/schedules"

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
        element: <RatesPage />
      },
      {
        path: 'schedules',
        element: <SchedulesPage />
      },
      {
        path: 'report',
        element: <ReportPage />
      }
    ]
  }
])

export default Router