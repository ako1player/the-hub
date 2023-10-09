import { useReducer,useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

const firestoreReducer = (state:any, action:any) =>{
    switch(action.type){
        case "IS_PENDING":
            return {success: false, isPending: true, error: null, document: null}
        case "ERROR":
            return{ success: false, isPending: false, error: action.payload, document: null}
        case "ADDED_DOCUMENT":
            return { success: true, isPending: false, error: null, document: action.payload}
        case "DELETED_DOCUMENT":
            return { success: true, isPending:false, error: null, document: null}
        case "UPDATED_DOCUMENT":
            return { success: true, isPending: false, error: null, document: action.payload}
        default:
            return state;
    }
}

export const useFirestore = (collection:any) =>{
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    //collection ref
    const ref = projectFirestore.collection(collection);

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action:any)=>{
        if(!isCancelled){
            dispatch(action);
        }
    }

    //add a document
    const addDocument = async (doc:any) =>{
        dispatch({type: "IS_PENDING"})

        try{
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({...doc, createdAt});
            dispatchIfNotCancelled({type: "ADDED_DOCUMENT", payload: addedDocument})
        } catch(err:any){
            dispatchIfNotCancelled({type: "ERROR", payload: err.message})
        }
    }

    //delete a document
    const deleteDocument = async (id:any) =>{
        dispatch({type: 'IS_PENDING'})

        try{
            await ref.doc(id).delete();
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
        }catch (err:any){
            dispatchIfNotCancelled({type: 'ERROR', payload: 'could not delete'})
        }
    }

    // update documents
    const updateDocument = async (id:any, updates:any) =>{
        dispatch({type: 'IS_PENDING'});

        try{
            const updatedDocument = await ref.doc(id).update(updates);
            dispatchIfNotCancelled({type: 'UPDATED_DOCUMENT', payload: updatedDocument})
            return updatedDocument
        }catch(err:any){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
            return null
        }
    }

    useEffect(()=>{
        return () => setIsCancelled(true);
    }, [])

    return { addDocument, deleteDocument, updateDocument, response}
}