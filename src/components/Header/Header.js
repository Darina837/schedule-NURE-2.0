import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import HeaderButton from "../../assets/header-button.svg";

export default function Header() {
    return (
        <div className="header__wrapper">
            <header className="header__content">
                <Link to="/" className="header__logo">
                    <img src={Logo} alt="Schedule" />
                </Link>
                {/* <Link to="/" className="header__button">
                    <img src={HeaderButton} alt="Login/Logout" />
                    <span>Войти</span>
                </Link> */}
            </header>
        </div>
    )
}