import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./pages/mainLayout"
function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
            </Route>
          </Routes>
      </Router>
    </>

  )
}

export default App
