import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";

export const useLogout = () =>{
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<null | any>(null)
    const [isPending, setIsPending] = useState(false);
    const {dispatch, user}:any = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        //sign out the user
        try{
            //update online status
            const {uid} = user;
            await projectFirestore.collection('users').doc(uid).update({online: false})

            await projectAuth.signOut();

            //dispatch logout action
            dispatch({type: 'LOGOUT'})

            //update state
            if(!isCancelled){
                setIsPending(false);
                setError(null);
            }
        }catch(err:any){
            if(!isCancelled){
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() =>{
        setIsCancelled(false);
        return () => setIsCancelled(true);
    },[])

    return { logout, error, isPending}
}