import React, { FC } from "react";
import { Link, useRouteError } from "react-router-dom";
import st from "./Page404.module.scss";

interface ErrorHook {
    status: number;
    statusText: string;
}

const Page404: FC = () => {
    const error = useRouteError() as ErrorHook;
    console.error(error);

    return (
        <div className={st.notFound}>
            <h1>{error.status}</h1>
            <h2>{error.statusText}</h2>
            <Link to="/">Перейти на головну</Link>
        </div>
    );
};

export default Page404;
