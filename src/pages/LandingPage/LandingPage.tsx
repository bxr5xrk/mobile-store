import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LandingPage: FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>LandingPage</h1>
            <Link to="products">{t("linkToProdutsPage")}</Link>
        </div>
    );
};

export default LandingPage;
