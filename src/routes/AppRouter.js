import {
    BrowserRouter as Router,
    Switch,
    //Route,
    Redirect
} from "react-router-dom";
import {AuthRouter} from "./AuthRouter";
import {JournalScreen} from "../components/journal/JournalScreen";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useDispatch} from "react-redux";
import {login} from "../actions/auth";
import {PublicRoute} from "./PublicRoute";
import {PrivateRoute} from "./PrivateRoute";
import {startLoadingNotes} from "../actions/notes";

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Ejecutar por lo menos una vez para ver el último usario coenctado por Firebase
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        })
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/*<Route path="/auth"
                           component={AuthRouter}/>

                    <Route exact
                           path="/"
                           component={JournalScreen}/>*/}

                    <PublicRoute isAuthenticated={isLoggedIn}
                                 path="/auth"
                                 component={AuthRouter}/>

                    <PrivateRoute exact
                                  isAuthenticated={isLoggedIn}
                                  path="/"
                                  component={JournalScreen}/>

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}