import {useState, useCallback, useMemo} from 'react';
import {ChatController, MuiChat} from 'chat-ui-react';
import defaultSettings from "./defaults";
import useOpenAI from "./hooks/useOpenAI";

const Chat = () => {
    const openai = useOpenAI();
    const [chatCtl] = useState(new ChatController({showDateTime: true}));

    const onResponse = async (req: any) => {
        const isSelf = chatCtl.getMessages()[chatCtl.getMessages().length - 1].self
        if (isSelf) {
            chatCtl.setActionRequest({
                type: 'text',
                placeholder: 'Please enter something',
            }, onResponse)
            // call api and add message
            const completion = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: req.value,
                max_tokens: defaultSettings['MAX_TOKENS'],
                frequency_penalty: defaultSettings['FREQUENCY_PENALTY'],
                presence_penalty: defaultSettings['PRESENCE_PENALTY'],
            })
            const responseText = completion.data.choices![0].text!;
            chatCtl.addMessage({
                type: 'text',
                content: responseText.trim(),
                self: false,
                avatar: '-',
            });


        } else {
            await chatCtl.setActionRequest({
                type: 'text',
                placeholder: 'Please enter something',
            }, onResponse)
        }
    }

    const handleMessage = useCallback(async (chatCtl: ChatController): Promise<void> => {
        await chatCtl.addMessage({
            type: 'text',
            content: `Hi,`,
            self: false,
            avatar: '-',
        });

        await chatCtl.setActionRequest({
            type: 'text',
            placeholder: 'Please enter something',
        }, onResponse);
    }, []);

    useMemo(() => {
        handleMessage(chatCtl);
    }, [handleMessage, chatCtl]);

    return (
        <MuiChat chatController={chatCtl}/>
    );
}

export default Chat;
