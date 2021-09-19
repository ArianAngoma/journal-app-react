import {types} from "../types/types";
import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {googleAuthProvider} from "../firebase/firebase-config";
import {uiFinishLoading, uiStartLoading} from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(
            uiStartLoading()
        )

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(({user}) => {
            console.log(user);

            dispatch(
                login(user.uid, user.displayName)
            )

            dispatch(
                uiFinishLoading()
            )
        }).catch(e => {
            console.error(e);

            dispatch(
                uiFinishLoading()
            )
        })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then(async ({user}) => {
            await updateProfile(auth.currentUser, {displayName: name})
            console.log(user);
            dispatch(
                login(user.uid, user.displayName)
            );
        }).catch(e => {
            console.error(e);
        })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}