import { async } from "@firebase/util";
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import * as ActionType from '../ActionType';

export const getDoctorsData = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Doctors"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            // console.log(`${doc.id} => ${doc.data()}`);
            // console.log(data);
        });
        dispatch({ type: ActionType.GET_DOCTORSDATA, payload: data })
    } catch (error) {
        dispatch(error_doctors(error.message))
    }
}

export const addDoctorsData = (data) => async (dispatch) => {
    try {
        const DoctorsRef = ref(storage, 'Doctors/' + data.prof_img.name);
        uploadBytes(DoctorsRef, data.prof_img)
            .then((snapshot) => {
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "Doctors"), {
                            ...data,
                            prof_img: url
                        });
                        dispatch({
                            type: ActionType.ADD_DOCTORSDATA, payload: {
                                id: docRef.id,
                                ...data,
                                prof_img : url
                            }
                        })
                    });
            });

    } catch (error) {
        dispatch(error_doctors(error.message));
    }
}

export const deleteDotorsData = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, "Doctors", id));
        console.log(id);
        dispatch({ type: ActionType.DELETE_DOCTORSDATA, payload: id })
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