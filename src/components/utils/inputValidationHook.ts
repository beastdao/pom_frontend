import { checkName, checkCommunity } from '../utils/inputCheck';
import { getValidationConditions } from '../utils/inputValidationConditions';
import { useState, useEffect } from 'react';

const useInputValidation = (
    value: string,
    type: 'name' | 'community',
    minLength: number,
    maxLength: number,
    isLoading: boolean,
    data: boolean | `0x${string}` | undefined,
    alreadyHasName: boolean = false,
    communityValidity: string | null = null
) => {
    const [feedbackText, setFeedbackText] = useState('');
    const [validity, setValidity] = useState<string | null>(null);
    const [shouldEnableButton, setShouldEnableButton] = useState(false);

    useEffect(() => {
        setFeedbackText('');
        setValidity(null);
        setShouldEnableButton(false);

        const validationConditions = getValidationConditions(value, minLength, maxLength);
        let matchingCondition = null;

        if (validationConditions !== null) {
            matchingCondition = validationConditions.find((condition) => condition.condition);
        }

        if (matchingCondition) {
            setFeedbackText(matchingCondition.feedbackText);
            setValidity(matchingCondition.inputValidity);
            setShouldEnableButton(matchingCondition.buttonStatus === 'enabled');
        } else {
            if (type === 'name' && data !== undefined && communityValidity === 'isValid') {
                const [status, inputValidity, buttonStatus] = checkName(
                    Boolean(data),
                    Boolean(alreadyHasName)
                );
                setFeedbackText(status);
                setValidity(inputValidity);
                setShouldEnableButton(buttonStatus !== 'disabled');
            } else if (type === 'community' && data !== undefined) {
                const [status, inputValidity] = checkCommunity(data.toString());
                setFeedbackText(status);
                setValidity(inputValidity);
                setShouldEnableButton(false);
            }
        }
    }, [value, isLoading, data, communityValidity, type, alreadyHasName]);

    return { feedbackText, validity, shouldEnableButton };
};

export default useInputValidation;
