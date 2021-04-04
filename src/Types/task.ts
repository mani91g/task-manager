export interface ITask{
    id?: number;
    message?: string;
    assigned_to?: string;
    created_on?: string;
    due_date?: string;
    priority: IPriority;
    assigned_name?: string;
}

export enum IPriority{
    LOW = 1,
    MEDIUM,
    HIGH
}