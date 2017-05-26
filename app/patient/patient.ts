import { Need } from "../need/need";
import { Questionnaire } from "../evaluation/questionnaire";

export class Patient {
    id: number;
    name: string;
    location: string;
    caregiver_id: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    quizs: Questionnaire[];
    

    needs: Need[];
}
