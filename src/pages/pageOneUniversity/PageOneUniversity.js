import "./PageOneUniversity.css";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import ForTeachers from "../../assets/teacher.png";
import ForStudents from "../../assets/student.png";

export default function PageOneUniversity() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [universityInfo, setUniversityInfo] = useState(null);
    let { idUniversity } = useParams();

    useEffect( () => {
        window.fetch(`https://schedule.dxrk.dev/api/university/${idUniversity}/info`)
        .then(res => res.json())
        .then(
            result => {
                setIsLoaded(true);
                setUniversityInfo(result);
            },
            error => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [] )

    if(error) {
        return <div>Ошибка: {error.message}</div>
    } else if(!isLoaded) {
        return (
            <div class="preloader__wrapper">
                <div>Loading</div>
            </div>
        );
    } else {
        return (
            <div className="page__wrapper">
                <Header />
                <main className="page__main">
                    <div className="page-one-university__wrapper">
                        <div className="page-one-university__row">
                            <Link to={'/universities'} className="page-one-university__button-prev">Вернуться назад</Link>
                            <div className="page-about-block">
                                <div className="page-one-university__about page-name page-about" title={universityInfo ? universityInfo.full_name : null}>{universityInfo ? universityInfo.short_name : null}</div>
                            </div>
                        </div>
                        <div className="page-one-university__row page-one-university__row-second">
                            <div className="page-one-university__row-item">
                                <img src={ForTeachers} alt="For teachers" />
                                <Link to={`/university-${idUniversity}/for-teacher/`}>Для преподавателей</Link>
                            </div>
                            <div className="page-one-university__row-item">
                                <img src={ForStudents} alt="For students" />
                                <Link to={`/university-${idUniversity}/for-student/`}>Для студентов</Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}