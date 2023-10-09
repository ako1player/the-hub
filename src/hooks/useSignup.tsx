import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config";

export const useSignup = () =>{
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<null | any>(null)
    const [isPending, setIsPending] = useState(false);
    const {dispatch}:any = useAuthContext();

    const signup = async (email:string, password:string, displayName:string, thumbnail:any) => {
        setError(null);
        setIsPending(true);

        try{
            //sign up user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);

            if(!res){
                throw new Error('Could not complete signup');
            }

            //upload user thumbnail
            const uploadPath = `thumbnails/${res.user?.uid}/${thumbnail.name}`;
            const img = await projectStorage.ref(uploadPath).put(thumbnail);
            const imgUrl = await img.ref.getDownloadURL();

            //add display name to user
            await res.user?.updateProfile({displayName, photoURL: imgUrl});

            //create a user document
            await projectFirestore.collection('users').doc(res.user?.uid).set({
                online: true,
                displayName,
                photoURL: imgUrl
            })

            //dispatch login action
            dispatch({type: 'LOGIN', payload: res.user})

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

    return { signup, error, isPending}
}