import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection:any, id:any) =>{
    const [document, setDocument] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    //real time data for document
    useEffect(()=>{
        const ref = projectFirestore.collection(collection).doc(id);

        const unsubscribe = ref.onSnapshot((snapshot:any)=>{
            //check if document exists
            if(snapshot.data()){
                setDocument({...snapshot.data(), id: snapshot.id});
                setError(null);   
            }
            else{
                setError('No Document Exists')
            }
        }, (err:any)=>{
            console.log(err.message)
            setError('Failed to get document');
        })

        //clean up function. 
        return () => unsubscribe();

    }, [collection, id])

    return {document, error}
}