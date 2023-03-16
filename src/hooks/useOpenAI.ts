import {useState} from 'react';
import {Configuration, OpenAIApi} from 'openai';

const useOpenAI = (): OpenAIApi => {
    const [openai] = useState(() => new OpenAIApi(new Configuration({apiKey: "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"})));
    return openai;
};

export default useOpenAI;