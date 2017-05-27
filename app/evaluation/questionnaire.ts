import { Question } from "./question";

export class Questionnaire {
    id: number;
    name: string;
    ref_questionnaire: string; //referencia internar do questionario, usado na rota
    reference:string; // caregiver, patient,material
    reference_id: string //id of caregiver,patient or material;
    reference_name: string //name of the caregiver/patient/material
    questions: Question[];
    done: boolean;
    date_done: string;

}
