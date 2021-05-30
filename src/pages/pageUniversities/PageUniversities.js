import './PageUniversities.css';
import Header from "../../components/Header/Header";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PageUniversities() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [universities, setUniversities] = useState([]);

    function SearchInput(arg) {
        let value = arg.trim();
        value = value.toUpperCase();
        let universitiesList = document.querySelectorAll(".page-universities__box");

        if(value !== "") {
            universitiesList.forEach(elem => {
                let currentValue = elem.textContent.toUpperCase();
                if(currentValue.search(value) === -1) {
                    elem.classList.add("hide");
                } else {
                    elem.classList.remove("hide");
                }
            });
        } else {
            universitiesList.forEach(elem => {
                elem.classList.remove("hide");
            })
        }
    }

    useEffect( () => {
        window.fetch("https://schedule.dxrk.dev/api/universities")
        .then(res => res.json())
        .then(
            result => {
                setIsLoaded(true);
                setUniversities(result);
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
                    <div className="page-universities__wrapper">
                        <input onInput={event => SearchInput(event.target.value)} className="page-universities__search" placeholder="Поиск университета..."></input>
                        <div className="page-universities__content">
                            {universities.sort((a, b) => a.short_name > b.short_name ? 1 : -1).map(university => (
                                <Link key={university.id} to={`/university-${university.id}`} className="page-universities__box" title={university.full_name}>{university.short_name}</Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}