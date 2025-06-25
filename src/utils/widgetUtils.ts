import { WidgetData } from "../types/widget.interface"

export const convertWidgetDataToFormData = (data: WidgetData): FormData => {
    const formData = new FormData();
    if(data.elements.length  < 1)
        return formData;
    if (data.backgroundImage !== null && data.backgroundImage !== undefined)
        formData.append('backgroundImage', data.backgroundImage); 
    // Append elements
    data.elements.forEach((element, index) => {
        // Append element metadata
        formData.append(`elements[${index}][id]`, element._id);
        formData.append(`elements[${index}][position.x]`, element.position.x.toString());
        formData.append(`elements[${index}][position.y]`, element.position.y.toString());

        // Append style metadata

        // Append content (file or text)
        if (element.type === 'image') {
            formData.append(`elements[${index}][content]`, element.content);
            formData.append(`elements[${index}][style.imageSize]`, element.style.imageSize?.toString() || '200');
        } else { 
            formData.append(`elements[${index}][isTitle]`, element.isTitle?.toString() || 'false');
            formData.append(`elements[${index}][content]`, element.content);
            if (element.style.color) formData.append(`elements[${index}][style.color]`, element.style.color);
            if (element.style.fontFamily) formData.append(`elements[${index}][style.fontFamily]`, element.style.fontFamily);
            if (element.style.fontSize) formData.append(`elements[${index}][style.fontSize]`, element.style.fontSize.toString());
            if (element.style.fontStyle) formData.append(`elements[${index}][style.fontStyle]`, element.style.fontStyle);
            if (element.style.fontWeight) formData.append(`elements[${index}][style.fontWeight]`, element.style.fontWeight);
            if (element.style.textDecoration) formData.append(`elements[${index}][style.textDecoration]`, element.style.textDecoration);
        }
        formData.append(`elements[${index}][type]`, element.type);
    });
    
    return  formData;
} 

export const isWidgetData = (result: unknown): result is WidgetData => {
    return (
        typeof result === 'object' &&
        result !== null &&
        '_id' in result   &&
        "elements" in result &&
        "backgroundImage" in result
    );
}