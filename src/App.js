import './App.css';
import Sidebar from './sidebar';
import Topbar from './topbar';
import Teachers from './Teachers';
import Createteachers from './Createteachers';
import Viewdetail from './Viewdetail';
import Editdetail from './Editdetail';
import Students from './Students'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Createuser from './createuser';
import Userview from './userview';
import Edit from './edit';
import { UserProvider } from './UserContext';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Studentsdetail from './Studentsdetail';


function App() {
  
  const [users, setUsers] = useState([]);

  return (

    <BrowserRouter>
      <div id='wrapper'>
        <UserProvider value={{users, setUsers}}>
          <Sidebar />
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Topbar />
              <div class="container-fluid">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/createteachers" element={<Createteachers />} />
                  <Route path="/view-detail/:id" element={<Viewdetail />} />
                   <Route path="/edit-detail/:id" element={<Editdetail />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/userscreate" element={<Createuser />} />
                  <Route path="/users-view/:id" element={<Userview />} />
                  <Route path="/users-edit/:id" element={<Edit />} />
                  <Route path="/studentsdetail" element={<Studentsdetail />} />
                </Routes>
              </div>
            </div>
          </div>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
