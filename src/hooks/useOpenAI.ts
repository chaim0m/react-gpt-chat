import {useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Configuration, OpenAIApi} from 'openai';

const useOpenAI = (): OpenAIApi => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const date = searchParams.get("date");
    const [openai] = useState(() => new OpenAIApi(new Configuration({apiKey: "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"})));
    return openai;
};

export default useOpenAI;