import { TemplateData, TemplateDataRequest, TemplateDataResponse } from "../types/dataResponse/template.interface"; 

export const isTemplateData = (item: unknown): item is TemplateData => {
    return (
        typeof item === 'object' &&
        item !== null &&
        'listWidget' in item &&
        'backgroundColor' in item &&
        'name' in item
        // Thêm các thuộc tính cần thiết khác của TemplateData nếu có
    );
}

export const isTemplateDataResponse = (result: unknown): result is TemplateDataResponse => {
    return (
        typeof result === 'object' &&
        result !== null &&
        'data' in result &&
        Array.isArray((result as TemplateDataResponse).data) && // Kiểm tra xem data có phải là mảng không
        (result as TemplateDataResponse).data.every(isTemplateData) && // Kiểm tra từng phần tử trong mảng
        'message' in result &&
        'statusCode' in result
    );
}


export const convertTemplateToFormData = (data: TemplateDataRequest): FormData => {
    const formData = new FormData(); 
    formData.append('name', data.name);
    formData.append('backgroundColor', data.backgroundColor);
    formData.append('listTrackId', JSON.stringify(data.listTrackId));
    formData.append('listWidgetId', JSON.stringify(data.listWidget));
    if(data.contentFont)
        formData.append('contentFont', data.contentFont);
    if(data.titleFont)  
        formData.append('titleFont', data.titleFont);
    return formData;
};