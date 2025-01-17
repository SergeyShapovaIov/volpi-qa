import {ICategoryNoQuestions} from "./ICategory";

export interface IQuestionNoID {
    text: string
    answer: string
    category: ICategoryNoQuestions
}

export interface IQuestion extends IQuestionNoID {
    id: number
}

export type UnknownQuestion = Pick<IQuestion, "id" | "text">

export type AnsweredUnknownQuestion = Pick<IQuestion, "text" | "answer"> & { unknownQuestionId: number, category: string }