import "./PageGroup.css";
import { useParams, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { useState, useEffect } from "react";

export default function PageGroupTeachers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [universityInfo, setUniversityInfo] = useState(null);
    const [groups, setGroups] = useState(null);
    let { idUniversity, idFaculty, idDepartament } = useParams();

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
        window.fetch(`https://schedule.dxrk.dev/api/department/${idDepartament}/teachers`)
        .then(res => res.json())
        .then(
            result => {
                setIsLoaded(true);
                setGroups(result);
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
                            <Link to={`/university-${idUniversity}/for-teacher/faculty-${idFaculty}`} className="page-one-university__button-prev">Вернуться назад</Link>
                            <div className="page-about-block">
                                <div className="page-one-university__about page-name page-about" title={universityInfo ? universityInfo.full_name : null}>{universityInfo ? universityInfo.short_name : null}</div>
                            </div>
                        </div>
                        <input onInput={event => SearchInput(event.target.value)} className="page-faculties__search" placeholder="Поиск преподавателя..."></input>
                        <div className="page-one-university__row page-one-university__row-second page-faculty-row">
                        <div className="page-faculties__content">
                            {groups ? groups.map(group => (
                                <Link key={group.id} to={`/university-${idUniversity}/for-teacher/faculty-${idFaculty}/departament-${idDepartament}/${group.id}`} className="page-faculties__box" title={group.full_name}>{group.short_name}</Link>
                            )) : null}
                        </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}