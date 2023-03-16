import {useEffect, useState, useRef} from 'react';
import {useSearchParams} from "react-router-dom";
// @ts-ignore
import {chunk, throttle} from "lodash";
import {Configuration, OpenAIApi} from 'openai';
import defaultSettings from "../defaults";
import {getInitPrompt} from "../utils";

const useOpenAI = (): OpenAIApi => {
        const [searchParams] = useSearchParams();
        const name = searchParams.get("name") ?? "";
        const date = searchParams.get("date") ?? "";
        const [openai] = useState(() => new OpenAIApi(new Configuration({apiKey: "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"})));
        const isApiCalledRef = useRef(false);

        useEffect(() => {
            const fullPrompt = getInitPrompt(name, date);
            // const chunkSize = Math.floor(fullPrompt.length / 3);
            // const stringChunks = chunk(fullPrompt, chunkSize);
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
        }, []);
        return openai;
    }
;

export default useOpenAI;