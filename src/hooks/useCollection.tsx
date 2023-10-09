import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection:any, _query:any, _orderBy:any) =>{
    const [documents, setDocuments] = useState<any>();
    const [error, setError] = useState<null | any>(null);

    //if we dont use a red --> infinite loop in useeffect
    //_query is an array and is "different" on every function call
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    useEffect(()=>{
        let ref:any = projectFirestore.collection(collection)

        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy);
        }

        const unsubscribe = ref.onSnapshot((snapshot:any) =>{
            let results:any = [];
            snapshot.docs.forEach((doc:any) =>{
                results.push({...doc.data(), id: doc.id})
            });

            //update state
            setDocuments(results);
            console.log(documents);
            setError(null);
        }, (error:any) =>{
            console.log(error)
            setError('could not fetch the data')
        })

        return () => unsubscribe();

    },[collection, query, orderBy])

    return {documents, error}
}