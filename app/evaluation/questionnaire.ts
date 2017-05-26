import { Question } from "./question";

export class Questionnaire {
    id: number;
    name: string;
    questions: Question[];
    done: boolean;
    date_done: string;

}
