import Navbar from './Navbar';
import Home from './Home';
import { Routes, Route} from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
function App() {
  return (

      <div className="App">
        <Navbar />
        <div className="content">
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blogs/:id" element={<BlogDetails />} /> { /* :id is used for the route */}
          <Route path="*" element={<NotFound />}></Route> {/* catch all for not found route */}
        </Routes>
        </div>
      </div>
  );
}

export default App;