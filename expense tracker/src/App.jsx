import React from 'react'
import {Routes , Route} from "react-router-dom"
import { Auth } from './pages/auth/index.jsx'
import { ExpenseTracker } from './pages/expense-tracker/index.jsx'

const App = () => {
  return (
    <div>

    <Routes>
      <Route path='/' exact element={ <Auth/> }/>
      <Route path='/expenseTrackerPage' exact element = {<ExpenseTracker/>} />
    </Routes>
    
    </div>
  )
}

export default App