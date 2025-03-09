import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./pages/mainLayout"
import Sidebar from "./components/sidebar"
import ArticleDetail from "./pages/articleDetail"
import Login from "./pages/login"
import Signup from "./pages/signup"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Sidebar />} />
            <Route path="/article/:articleId" element={<ArticleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </>

  )
}

export default App
