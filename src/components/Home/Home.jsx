import React from "react";
import style from './Home.module.scss';
import {withAuthRedirect} from "../../hoc/authRedirect";

const Home = () => {
    return (
        <main className={style.container}>Welcome</main>
    )
}

export default withAuthRedirect(Home)