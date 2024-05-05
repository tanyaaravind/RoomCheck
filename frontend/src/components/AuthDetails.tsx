import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from "../../../backend/firebase";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState<any>();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => { 
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    return (
        <div>{ authUser ? <p>Signed In</p> : <p>Signed Out</p> }</div>
    );
};

export default AuthDetails;