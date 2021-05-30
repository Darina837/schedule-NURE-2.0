import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import PageHome from "./pages/pageHome/PageHome";
import PageUniversities from './pages/pageUniversities/PageUniversities';
import PageOneUniversity from './pages/pageOneUniversity/PageOneUniversity';
import PageFacultyStudents from './pages/pagesForStudents/pageFaculty/PageFaculty';
import PageDepartamentStudents from './pages/pagesForStudents/pageDepartament/PageDepartament';
import PageGroupStudents from './pages/pagesForStudents/pageGroup/PageGroup';
import PageScheduleStudents from './pages/pagesForStudents/pageSchedule/PageSchedule';
import PageFacultyTeachers from './pages/pagesForTeachers/pageFaculty/PageFaculty';
import PageDepartamentTeachers from './pages/pagesForTeachers/pageDepartament/PageDepartament';
import PageGroupTeachers from './pages/pagesForTeachers/pageGroup/PageGroup';
import PageScheduleTeachers from './pages/pagesForTeachers/pageSchedule/PageSchedule';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} component={PageHome} exact />
        <Route path={'/universities'} component={PageUniversities} exact />
        <Route path={'/university-:idUniversity'} component={PageOneUniversity} exact />
        {/* <Route path={'/university-:id/for-teacher/'} component={} exact />*/}
        <Route path={'/university-:idUniversity/for-student/'} component={PageFacultyStudents} exact /> 
        <Route path={'/university-:idUniversity/for-student/faculty-:idFaculty'} component={PageDepartamentStudents} exact /> 
        <Route path={'/university-:idUniversity/for-student/faculty-:idFaculty/departament-:idDepartament'} component={PageGroupStudents} exact /> 
        <Route path={'/university-:idUniversity/for-student/faculty-:idFaculty/departament-:idDepartament/group-:idGroup'} component={PageScheduleStudents} exact /> 
        <Route path={'/university-:idUniversity/for-teacher/'} component={PageFacultyTeachers} exact /> 
        <Route path={'/university-:idUniversity/for-teacher/teacher-:idTeacher'} component={PageScheduleTeachers} exact /> 
        {/* <Route path='/schedule-faculty' component={PageFaculty} exact />
        <Route path='/schedule-group/find' component={PageGroup} />
        <Route path='/schedule-group/:group' component={PageScheduleGroup} exact />
        <Route path='/schedule-professor' component={PageDepartment} exact />
        <Route path='/schedule-professor/find' component={PageProfessor} />
        <Route path='/schedule-professor/:professor' component={PageScheduleProfessor} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
