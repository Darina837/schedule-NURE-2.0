import './PageHome.css';
import Header from "../../components/Header/Header";
import HomeImg from "../../assets/home-img.png";
import { Link } from 'react-router-dom';

export default function PageHome() {
  return (
    <div className="page__wrapper">
        <Header />
        <main className="page__main">
            <div className="page-home__wrapper">
                <img src={HomeImg} alt="Let's go" />
                <Link to="/universities" className="page-home__button">
                    Начать  
                </Link>
            </div>
        </main>
    </div>
  );
}