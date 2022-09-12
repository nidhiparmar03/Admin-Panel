import { combineReducers } from "redux";
import { counterReduex } from "./Counter_reduex";
import { doctorsreducer } from "./Doctors_reduex";
import { medicincesReduex } from "./Medicinces_reduex";
import { Patientsreduex } from "./Patients_reduex";


export const rootCounter = combineReducers ({
    counter : counterReduex,
    medicinces : medicincesReduex,
    patients : Patientsreduex,
    doctors : doctorsreducer,
})