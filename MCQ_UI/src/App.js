// import logo from './logo.svg';
import './App.css';
import Start from './components/Start';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import TeacherHomepage from './components/TeacherHomepage';
import StudentsList from './components/StudentsList';
import Addexam from './components/Addexam';
import Studenthomepage from './components/Studenthomepage';
import Exampage from './components/Exampage';
import { useState } from 'react';
import Alert from './components/Alert';
import Forgpass from './components/Forgpass';
import Forgpasemail from './components/Forgpasemail';
import Questions from './components/Questions';
import Questiondiv from './components/Questiondiv';
import EditExamPage from './components/EditExamPage';
import ResultsPage from './components/ResultsPage';
import LoadingBar from 'react-top-loading-bar'
import Instruction from './components/Instruction';
function App() {
  const [progress, setProgress] = useState(0);
  const [alert, setalert] = useState(null);
  const setprogress = (val) => {
    setProgress(val);
  }
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);

  }
  return (
    <>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
      <Alert alert={alert} />
      <Router>
        <Routes>
          <Route exact path="/" element={<Start setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/teacherhomepage" element={<TeacherHomepage setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/studentlist" element={<StudentsList setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/addexam" element={<Addexam setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/studenthomepage" element={<Studenthomepage setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/exampage" element={<Exampage setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/instruction" element={<Instruction setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/forgpass/:param1/:param2" element={<Forgpass setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/forgpassemail" element={<Forgpasemail setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/questions" element={<Questions setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/questiondiv" element={<Questiondiv setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/editexampage" element={<EditExamPage setprogress={setprogress} showalert={showalert} />} />
          <Route exact path="/resultpage" element={<ResultsPage setprogress={setprogress} showalert={showalert} />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
