export const getChanges = <T extends Record<string, unknown>>(newObj: T, oldObj: T): Record<string, { oldValue: T[keyof T]; newValue: T[keyof T] }> => {
    return Object.keys(newObj).reduce((acc, key) => {
        if (newObj[key as keyof T] !== oldObj[key as keyof T]) {
        acc[key] = { oldValue: oldObj[key as keyof T], newValue: newObj[key as keyof T] };
        }
        return acc;
    }, {} as Record<string, { oldValue: T[keyof T]; newValue: T[keyof T] }>);
};