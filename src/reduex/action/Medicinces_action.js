import { deleteMedicincesData, getAllMedicincesData, postMedicincesData, updateMedicincesData } from "../../common/axios/Medicinces_api";
import { collection, addDoc, getDocs } from "firebase/firestore";
import * as ActionType from "../ActionType";
import { db } from "../../firebase";


export const getMedicinces = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Medicinces"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (error) {
        dispatch(errorMedicinces(error.message))
    }
}

export const addMedicinces = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "Medicinces"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ");
    } catch (error) {
        dispatch(errorMedicinces(error.message));
    }
}

export const deleteMedicinces = (id) => (dispatch) => {
    try {
        deleteMedicincesData(id)
            .then(dispatch({ type: ActionType.DELETE_MEDICINCES, payload: id }))
            .catch((error) => {
                dispatch(errorMedicinces(error.message));
            });
    } catch (error) {
        dispatch(errorMedicinces(error.message));
    }
    console.log(id);
}

export const updateMedicinces = (data) => (dispatch) => {
    console.log(data);
    try {
        updateMedicincesData(data)
            .then((data) => {
                dispatch({ type: ActionType.UPDATE_MEDICINCES, payload: data.data })
            })
            .catch((error) => {
                dispatch(errorMedicinces(error.message));
            });
    } catch (error) {
        dispatch(errorMedicinces(error.message));
    }

}

export const LoadingMedicinces = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_MEDICINCES });
}

export const errorMedicinces = (error) => (dispatch) => {
    dispatch({ type: ActionType.ERROR_MEDICINCES, payload: error });
}