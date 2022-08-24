import React, { FC, ReactNode } from "react";
import { Header } from "./Header/Header";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="wrapper">
            <Header />

            <main>{children}</main>
        </div>
    );
};
