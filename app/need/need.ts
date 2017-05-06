import {Material} from "../material/material";

export class Need {
    
    id: number;
    description: string;
    created_by: number;
    created_at:string;
    updated_at: string;
    pivot: string[];
    materials: Material[];
    
}