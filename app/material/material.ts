import { Questionnaire } from "../evaluation/questionnaire";
export class Material {
    

    id: number;
    type: string;
    description: string;
    name: string;
    body: string; //no caso de tipo texto
    path: string;
    url: string;
    number:number; //number contact emergency
    quizs: Questionnaire[];
    evaluation: number;
    materials: Material[];
    
    created_by: number;
    created_at: string;
    updated_at: string;
}
