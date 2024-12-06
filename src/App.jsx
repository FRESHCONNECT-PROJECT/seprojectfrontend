import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hero from "./components/Hero";  // Ensure this import is correct
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchUniversities from "./pages/SearchUniversities";
import Universities from "./pages/Universities";
import Grocery from "./pages/Grocery";
import Transport from "./pages/Transport";
import Explore from "./pages/Explore";
import Accommodation from "./pages/Accommodation";
import Footer from "./components/Footer";
import TransportForm from "./components/TransportForm";
import UniversitiesDetails from "@/pages/UniversitiesDetails";
import Myaccount from "./pages/My_account";
import Searchgrocery from './pages/searchgrocery'
import SearchTransport from './pages/SearchTransport'
import Chat from './pages/Chat'
import SearchAccomidation from './pages/SearchAccomidation'
import Searchall from './pages/Searchall'
import Viewgroceries from './pages/viewgrocery'
import ViewAccomidation from './pages/viewaccomidation'
import Postaccomidation from './pages/Postaccomidation'
import Myposts from './pages/Myposts'
import Events from './pages/viewevents'


const App = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
     
      
      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search-universities" element={<SearchUniversities />} />
          <Route path="/university/:universityName" element={<UniversitiesDetails />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/transportform" element={<TransportForm />} />
          <Route path="/my-account" element={<Myaccount />} />
          <Route path="/search-grocery" element={<Searchgrocery />} />
          <Route path="/search-transport" element={<SearchTransport />} />
          <Route path="/group-chat" element={<Chat />} />
          <Route path="/search-accomidation" element={<SearchAccomidation />} />
          <Route path="/searchby-universities" element={<Searchall />} />
          <Route path="/post-accomidation" element={<Postaccomidation />} />
          <Route path="/myposts" element={<Myposts />} />

          <Route path="/view-groceries/:fhvbhb" element={<Viewgroceries />} />
          <Route path="/view-accommodations/:fhvbhb" element={<ViewAccomidation />} />
          <Route path="/view-events/:fhvbhb" element={<Events />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  </Router>
);

export default App;
