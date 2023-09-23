import { TaskStatus } from '../entities/Task';

export interface CreateTaskBody {
    title: string
}

export interface UpdateTaskBody {
    id: number,
    title: string,
    status?: TaskStatus
}

export interface GetStatsFilter { date?: Date }
