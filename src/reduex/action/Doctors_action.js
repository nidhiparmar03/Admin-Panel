import { async } from "@firebase/util";
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import * as ActionType from '../ActionType';

export const getDoctorsData = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Doctors"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            // console.log(data);
        });
        dispatch({ type: ActionType.GET_DOCTORSDATA, payload: data })
    } catch (error) {
        dispatch(error_doctors(error.message))
    }
}

export const addDoctorsData = (data) => async (dispatch) => {
    try {

        let radomNum = Math.floor(Math.random() * 1000000).toString();

        const DoctorsRef = ref(storage, 'Doctors/' + radomNum);
        uploadBytes(DoctorsRef, data.prof_img)
            .then((snapshot) => {
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "Doctors"), {
                            ...data,
                            prof_img: url,
                            fileName: radomNum
                        });
                        dispatch({
                            type: ActionType.ADD_DOCTORSDATA, payload: {
                                id: docRef.id,
                                ...data,
                                prof_img: url
                            }
                        })
                    });
            });

    } catch (error) {
        dispatch(error_doctors(error.message));
    }
}

export const deleteDotorsData = (data) => async (dispatch) => {
    try {
        console.log(data.row);
        const deletetRef = ref(storage, "Doctors/" + data.row.fileName);

        deleteObject(deletetRef)
            .then(async () => {
                await deleteDoc(doc(db, "Doctors", data.id));
                dispatch({ type: ActionType.DELETE_DOCTORSDATA, payload: data.id })
            }).catch((error) => {
                dispatch(error_doctors(error.message))
            });
    } catch (error) {
        dispatch(error_doctors(error.message))
    }
}

export const updateDotoreData = (data) => async (dispatch) => {
    try {
        const DoctorsRef = doc(db, "Doctors", data.id);
        await updateDoc(DoctorsRef, {
            name: data.name,
            email: data.email,
            phone: data.phone
        });
        dispatch({ type: ActionType.UPDATE_DOCTORSDATA, payload: data })
    } catch (error) {
        dispatch(error_doctors(error.message));
    }
}

export const loading_doctors = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_DOCTORSDATA })
}

export const error_doctors = (error) => (dispatch) => {
    dispatch({ type: ActionType.ERROR_DOCTORSDATA, payload: error })
}