import {useEffect, useState, useRef} from 'react';
import {useSearchParams} from "react-router-dom";
import {Configuration, OpenAIApi} from 'openai';
import defaultSettings from "../defaults";
import {getInitPrompt} from "../utils";

const useOpenAI = (): OpenAIApi => {
        const [searchParams] = useSearchParams();
        const name = searchParams.get("name") ?? "";
        const date = searchParams.get("date") ?? "";
        const apiKey = "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";
        const [openai] = useState(() => new OpenAIApi(new Configuration({apiKey})));
        const isApiCalledRef = useRef(false);

        useEffect(() => {
            const fullPrompt = getInitPrompt(name, date);
            if (!isApiCalledRef.current) {
                isApiCalledRef.current = true;
                openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: fullPrompt,
                    max_tokens: defaultSettings['MAX_TOKENS'],
                    frequency_penalty: defaultSettings['FREQUENCY_PENALTY'],
                    presence_penalty: defaultSettings['PRESENCE_PENALTY'],
                })
            }
        }, [date, name, openai]);
        return openai;
    }
;

export default useOpenAI;