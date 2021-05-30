import "./PageDepartament.css";
import { useParams, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { useState, useEffect } from "react";

export default function PageDepartamentTeachers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [universityInfo, setUniversityInfo] = useState(null);
    const [departaments, setDepartaments] = useState(null);
    let { idUniversity, idFaculty } = useParams();

    function SearchInput(arg) {
        let value = arg.trim();
        value = value.toUpperCase();
        let facultiesList = document.querySelectorAll(".page-faculties__box");

        if(value !== "") {
            facultiesList.forEach(elem => {
                let currentValue = elem.textContent.toUpperCase();
                if(currentValue.search(value) === -1) {
                    elem.classList.add("hide");
                } else {
                    elem.classList.remove("hide");
                }
            });
        } else {
            facultiesList.forEach(elem => {
                elem.classList.remove("hide");
            })
        }
    }

    useEffect( () => {
        window.fetch(`https://schedule.dxrk.dev/api/faculty/${idFaculty}/departments`)
        .then(res => res.json())
        .then(
            result => {
                setIsLoaded(true);
                setDepartaments(result);
            },
            error => {
                setIsLoaded(true);
                setError(error);
            }
        );
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
        );
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
                            <Link to={`/university-${idUniversity}/for-teacher/`} className="page-one-university__button-prev">Вернуться назад</Link>
                            <div className="page-about-block">
                                <div className="page-one-university__about page-name page-about" title={universityInfo ? universityInfo.full_name : null}>{universityInfo ? universityInfo.short_name : null}</div>
                            </div>
                        </div>
                        <input onInput={event => SearchInput(event.target.value)} className="page-faculties__search" placeholder="Поиск кафедры..."></input>
                        <div className="page-one-university__row page-one-university__row-second page-faculty-row">
                        <div className="page-faculties__content">
                            {departaments ? departaments.map(departament => (
                                <Link key={departament.id} to={`/university-${idUniversity}/for-teacher/faculty-${idFaculty}/departament-${departament.id}`} className="page-faculties__box" title={departament.full_name}>{departament.short_name}</Link>
                            )) : null}
                        </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}