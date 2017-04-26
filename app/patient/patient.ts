import {Need} from "../need/need";

export class Patient {
    id: number;
    name: string;
    problem: string;
    needs: Need[];
}
