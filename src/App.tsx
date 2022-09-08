import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { routes } from "./router";

const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    {routes.map((i) => (
                        <Route
                            key={i.path}
                            path={i.path}
                            element={<i.element />}
                        />
                    ))}
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Routes>
            </Layout>
        </>
    );
};

export default App;
