import { Need } from "../../need/need";

export class Data {
    id: number;
    name: string;
    location: string;
    caregiver_id: string;
    created_by: number;
    created_at: string;
    updated_at: string;

    needs: Need[];
}