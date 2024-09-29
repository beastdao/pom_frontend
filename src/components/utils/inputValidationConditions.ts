export type ValidationCondition = {
    condition: boolean;
    feedbackText: string;
    inputValidity: string | null;
    buttonStatus: string;
};

export const getValidationConditions = (
    inputValue: string,
    minValue: number,
    maxValue: number
): ValidationCondition[] | null => {
    const allowedCharsPattern = /^[a-zA-Z0-9$&*+-.<>^_|~]+$/;

    const validationConditions: ValidationCondition[] = [
        {
            condition: inputValue.trim() === '',
            feedbackText: '',
            inputValidity: null,
            buttonStatus: 'disabled',
        },
        {
            condition: inputValue.length < minValue,
            feedbackText: 'Too Short',
            inputValidity: 'isInvalid',
            buttonStatus: 'disabled',
        },
        {
            condition: inputValue.length > maxValue,
            feedbackText: 'Too Long',
            inputValidity: 'isInvalid',
            buttonStatus: 'disabled',
        },
        {
            condition: !allowedCharsPattern.test(inputValue) || inputValue.includes(','),
            feedbackText: 'Contains Invalid Characters',
            inputValidity: 'isInvalid',
            buttonStatus: 'disabled',
        },
        {
            condition: inputValue[0] === '.' || inputValue[inputValue.length - 1] === '.',
            feedbackText: 'Cannot start or end with dot',
            inputValidity: 'isInvalid',
            buttonStatus: 'disabled',
        },
    ];

    return validationConditions;
};
