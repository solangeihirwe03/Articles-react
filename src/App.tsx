import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./pages/mainLayout"
import Home from "./pages/home"
import ArticleDetail from "./pages/articleDetail"
import Login from "./pages/login"
import Signup from "./pages/signup"
import { AuthProvider } from "./utils/context/authContext"
import ProtectedRoutes from "./utils/protectedRoute/protectedRoute"
import CreateArticle from "./pages/createArticle"
import UpdateArticle from "./pages/updateArticle"
import ContactUs from "./pages/contactUs"
import AboutMe from "./pages/aboutMe"
import Search from "./pages/search"

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/search-results" element={<Search/>}/>
              <Route path="/article/:articleId" element={<ArticleDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about-me" element={<AboutMe/>}/>
              <Route path="/contact-us" element={<ContactUs/>}/>
              <Route element={<ProtectedRoutes />}>
                <Route path="/create-article" element={<CreateArticle />} />
                <Route path="/update-article/:articleId" element={<UpdateArticle/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>

    </>

  )
}

export default App
