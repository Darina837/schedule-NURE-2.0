import "./PageSchedule.css";
import { useParams, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { useState, useEffect, createRef } from "react";

import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'moment/locale/ru';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Pdf from "react-to-pdf";

const ref = createRef();
const options = {
    orientation: 'landscape'
};

export default function PageScheduleTeachers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [universityInfo, setUniversityInfo] = useState(null);
    const [schedule, setSchedule] = useState(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    let arrTypes = [];

    let { idUniversity, idFaculty, idDepartament, idTeacher } = useParams();

    let arrDates = [];
    let currentSchedule = [];
    let arrColors = ["#262103", "#726408", "#C0AB0C", "#A8A310", "#8CB12F", "#79A49D", "#587792", "#384856", "#849AAE", "#080A0C"];

    const [inputValue, setInputValue] = useState("");

    const inputNotes = (e) => {
        setInputValue(e.target.value);
        if(inputValue.length > 0) {
            localStorage.setItem(e.target.name, e.target.value);
        } else {
            localStorage.removeItem(e.target.name);
        }
    }

    if(startDate && endDate) {
        arrDates.push(moment(startDate).format('DD.MM.YYYY'));
        let enumerateDaysBetweenDates = function(startDate, endDate) {
            let currDate = moment(startDate).startOf('day');
            let lastDate = moment(endDate).startOf('day');
         
            while(currDate.add(1, 'd').diff(lastDate) < 0) {
                arrDates.push(currDate.clone().format('DD.MM.YYYY'));
            }
            arrDates.push(moment(endDate).format('DD.MM.YYYY'));
            
        };
        enumerateDaysBetweenDates(startDate, endDate);
        arrTypes = [];
        currentSchedule = [];
        arrDates.forEach((date, id) => {
            let arr = [];
            let obj = {
                id: id,
                date: date,
                lessons: arr
            };
            
            schedule.forEach(item => {
                if(item.date === date) {
                    arr.push({lesson: item, note: localStorage.getItem(item.id) ? localStorage.getItem(item.id) : ""});
                    if(arrTypes.length > 0) {
                        arrTypes.forEach((type, ind) => {
                            if(type.type !== item.type) {
                                arrTypes.push({type: item.type, color: arrColors[ind + 1]})   
                            }
                        })
                    } else {
                        arrTypes.push({type: item.type, color: arrColors[0]});
                    }
                }
            });
            currentSchedule.push(obj);
            console.log(currentSchedule);
            console.log(arrTypes);
        });
    }

    
    useEffect( () => {
        window.fetch(`https://schedule.dxrk.dev/api/teacher/${idTeacher}/lessons-normal-short-names`)
        .then(res => res.json())
        .then(
            result => {
                setIsLoaded(true);
                setSchedule(result);
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
            <div className="page__wrapper page__wrapper-schedule">
                <Header />
                <main className="page__main page__schedule">
                    <div className="page-one-university__wrapper schedule__block">
                        <div className="schedule__title">Выберите дату</div>
                        <DateRangePicker
                            startDate={startDate} 
                            startDateId="your_unique_start_date_id" 
                            endDate={endDate} 
                            endDateId="your_unique_end_date_id" 
                            onDatesChange={({ startDate, endDate }) => {setStartDate(startDate); setEndDate(endDate)}} 
                            focusedInput={focusedInput} 
                            onFocusChange={focusedInput => setFocusedInput(focusedInput)} 
                            firstDayOfWeek={1}
                            startDatePlaceholderText='Начало'
                            endDatePlaceholderText='Конец'
                            withPortal={true}
                            hideKeyboardShortcutsPanel={true}
                            displayFormat='DD.MM.yyyy'
                            numberOfMonths={document.documentElement.clientWidth <= 1000 ? 1 : 2}
                        />  
                        <table id="tabledata" ref={ref}>
                            <thead>
                               <tr>
                                <th style={{border: '1px solid black'}}>Дата</th>
                                <th style={{border: '1px solid black'}}>Время</th>
                                <th style={{border: '1px solid black'}}>Занятие</th>
                                <th style={{border: '1px solid black'}}>Группа</th>
                                <th style={{border: '1px solid black'}}>Аудитория</th>
                                <th style={{border: '1px solid black'}}>Пометки</th>
                            </tr> 
                            </thead>
                            <tbody>
                                {currentSchedule.length > 0 ? currentSchedule.map(item => (
                                    <tr key={item.id}>
                                        <td style={{border: '1px solid black'}}>{item.date}</td>
                                        <td style={{border: '1px solid black'}}>
                                        {item.lessons.map(el => (
                                            <div key={el.lesson.id}>
                                            {el.lesson.classtime.start}-{el.lesson.classtime.end}
                                            </div>
                                        )) }
                                        </td>
                                        <td style={{border: '1px solid black'}}>
                                        {item.lessons.map(el => (
                     
                                            <div key={el.lesson.id} className="type__subject" title={el.lesson.type} style={{background: arrTypes.find(type => type.type === el.lesson.type).color}}>
                                            {el.lesson.subject}
                                            </div>
                                
                                        )) }
                                        </td>
                                        <td style={{border: '1px solid black'}}>
                                        {item.lessons.map(el => (
                                            <div key={el.lesson.id}>
                                            {el.lesson.group}
                                            </div>
                                        )) }
                                        </td>
                                        <td style={{border: '1px solid black'}}>
                                        {item.lessons.map(el => (
                                            <div key={el.lesson.id}>
                                            {el.lesson.classroom}
                                            </div>
                                        )) }
                                        </td>
                                        <td style={{border: '1px solid black'}}>
                                            {item.lessons.map(el => (
                                                <textarea key={el.lesson.id} name={el.lesson.id} placeholder="Добавить" value={el.note} onChange={inputNotes}>{el.note}</textarea>
                                            ))}
                                        </td>
                                    </tr>
                                )) : null}
                            </tbody>
                           
                        </table>
                        <Pdf targetRef={ref} filename="schedule.pdf" options={options} x={.5} y={.5} scale={0.8}>
        {({ toPdf }) => <button className="schedule__button" onClick={toPdf}>Скачать PDF</button>}
      </Pdf>
      <div className="types__legenda">
          {arrTypes.map((type, index) => (
              <div key={index} style={{background: type.color, width: `calc(100% / ${arrTypes.length})`}}>{type.type}</div>
          ))}
      </div>
                    </div>
                </main>
            </div>
        );
    }
}