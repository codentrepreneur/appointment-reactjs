import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/Common.scss';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from './common/Nav';
import Home from './component/Home';
import Appointments from './component/Appointments';
import Login from './component/Login';
import Register from './component/Register';
import EditAppointment from './component/EditAppointment';
import CreateAppointment from './component/CreateAppointment';
import Forgetpassword from './component/Forgetpassword';

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <Nav/>
                <div className="container py-4">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/appointments" element={<Appointments/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>} ></Route>
                        <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
                        <Route path="/create-appointment" element={<CreateAppointment />}></Route>
                        <Route path="/edit-appointment" element={<EditAppointment />}></Route>

                    </Routes>
                </div>
            </div>
        </Router>
    </div>
  );
}

export default App;
