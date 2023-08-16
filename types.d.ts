type Note = {
    id: number,
    title: string,
    description: string,
    tags: string[],
    date: string,
    completed: boolean,
}

type ParamDateFormat = "dd/mm/yyyy" | "yyyy-mm-dd"

type Option = {
    label: string,
    value: string
}