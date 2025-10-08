import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Body from "./components/Body"
import Feed from "./components/Feed"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
function App() {


  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter  basename="/">
   <Routes>
    <Route path="/" element={<Body/>}>
      <Route path="/" element={<Feed/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/connections" element={<Connections/>}/>
      <Route path="/request" element={<Profile/>}/>
    
    </Route>
   
    
   </Routes>
   
   </BrowserRouter>

    </Provider>
   
    
 
   
    </>
  )
}

export default App
