import { WidgetData } from "../widget.interface";

export interface BaseTemplateData {
    backgroundColor: string;
    titleFont?: string;
    contentFont?: string;
    listTrackId: Array<string>;
    name: string;
    _id?: string;
    createdAt?: string;
}

export interface TemplateData extends BaseTemplateData {
    listWidget: Array<WidgetData>;
}

export interface TemplateDataRequest extends BaseTemplateData {
    listWidget: Array<string>;
}

export interface TemplateDataResponse{
    data: TemplateData[];
    message: string;
    statusCode: number;
}