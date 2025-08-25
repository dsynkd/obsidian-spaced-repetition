import { RepItemScheduleInfo } from "src/algorithms/base/rep-item-schedule-info";
import { ISRFile } from "src/file";
import { Question } from "src/question";

export interface IDataStoreAlgorithm {
    noteGetSchedule(note: ISRFile): Promise<RepItemScheduleInfo>;
    noteSetSchedule(
        note: ISRFile,
        scheduleInfo: RepItemScheduleInfo,
        difficulty?: string,
    ): Promise<void>;
    questionFormatScheduleAsHtmlComment(question: Question): string;
}
