import { ReactElement, useCallback, useState, useMemo } from 'react';
import { ChatController, MuiChat} from 'chat-ui-react';
import { Configuration, OpenAIApi } from "openai";
import {
  Box,
  CssBaseline,
  Divider,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import defaultSettings from "./defaults";


const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
    },
  },
});

export function App(): ReactElement {
  const [openai] = useState(new OpenAIApi(new Configuration({ apiKey: "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" })));
  const [chatCtl] = useState(
      new ChatController({
        showDateTime: true,
      }),
  );

    const onResponse = async (req: any) => {
        // check if self or not from chatCtl.messages from last message
        // console.log(chatCtl.getMessages())
        const isSelf = chatCtl.getMessages()[chatCtl.getMessages().length - 1].self
        if (isSelf) {
            // call api and add message
            openai.createCompletion({
                model: 'text-davinci-003',
                prompt: req.value,
                max_tokens: defaultSettings['MAX_TOKENS'],
                frequency_penalty: defaultSettings['FREQUENCY_PENALTY'],
                presence_penalty: defaultSettings['PRESENCE_PENALTY'],
            }).then((completion: any) => {
                const responseText = completion.data.choices![0].text!;
                chatCtl.addMessage({
                    type: 'text',
                    content: responseText.trim(),
                    self: false,
                    avatar: '-',
                }).then(() => {
                    chatCtl.setActionRequest({
                        type: 'text',
                        placeholder: 'Please enter something',
                    }, onResponse)
                })
            })
        }  else {
            await chatCtl.setActionRequest({
                type: 'text',
                placeholder: 'Please enter something',
            }, onResponse)
        }
    }

    const handleMessage = useCallback(async (chatCtl: ChatController): Promise<void> => {
        await chatCtl.addMessage({
            type: 'text',
            content: `Hi I am a X, please feel free to ask any questions.`,
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
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Box sx={{ height: '100%', backgroundColor: 'gray' }}>
          <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxWidth: '640px',
                marginLeft: 'auto',
                marginRight: 'auto',
                bgcolor: 'background.default',
              }}
          >
            <Typography sx={{ p: 1 }}>
              Welcome to{' '}
              <Link href="https://www.gfh.org.il/">
                shoah-4d
              </Link>{' '}
              demo site.
            </Typography>
            <Divider />
            <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
              <MuiChat chatController={chatCtl} />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
  );
}