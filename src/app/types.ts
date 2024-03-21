import { status } from "./constants"

export type Project = {
    title: string,
    description: string,
    id: string,
    status: typeof status[keyof typeof status],
    deadline: string,
    startDate: string
}