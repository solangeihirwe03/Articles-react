import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./pages/mainLayout"
import Sidebar from "./components/sidebar"
import ArticleDetail from "./pages/articleDetail"
function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
            <Route index element={<Sidebar/>}/>
            <Route path="/article/:articleId" element={<ArticleDetail/>}/>
            </Route>
          </Routes>
      </Router>
    </>

  )
}

export default App
