import { BASED_URL } from "../../fetch/BasedUrl";
import * as Actiontype from "../ActionType";

export const getPatientsData = () => (dispatch) => {

    try {
        dispatch(loading_Patients());

        setTimeout(function () {
            fetch(BASED_URL + "Patients")
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then((response) => response.json())
                .then((data) => dispatch({ type: Actiontype.GET_PATIENTSDATA, payload: data }))
                .catch((error) => dispatch(error_Patients(error.message)));
        }, 2000)
    } catch (error) {
        console.log(error);
    }
}

export const addPatients = (data) => (dispatch) => {
    try{
        fetch(BASED_URL + 'Patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then((response) => response.json())
            .then((data) => dispatch({ type: Actiontype.ADD_PATIENTS, payload: data }))
            .catch((error) => {
               dispatch(error_Patients(error.message))
            });
    }catch(error){
        dispatch(error_Patients(error.message))
    }
}

export const deletePatients = (id) => (dispatch) => {
    try {
        fetch(BASED_URL + 'Patients/' + id, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then((response) => response.json())
            .then(dispatch({ type: Actiontype.DELETE_PATIENTS, payload: id }))
    } catch (error) {
        dispatch(error_Patients(error.message))
    }
}

export const updatePatients = (data) => (dispatch) => {
    try {
        fetch(BASED_URL + 'Patients/' + data.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then((response) => response.json())
            .then((data) => dispatch({ type: Actiontype.UPDATE_PATIENTS, payload : data }))
            .catch((error) => {
                dispatch(error_Patients(error.message))
             });
    } catch (error) {
        dispatch(error_Patients(error.message));
    }
}

export const loading_Patients = () => (dispatch) => {
    dispatch({ type: Actiontype.LOADING_PATIENTS });
}

export const error_Patients = (error) => (dispatch) => {
    dispatch({ type: Actiontype.ERROR_PATIENTS, payload: error })
}