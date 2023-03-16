import { ReactElement } from 'react';
import Layout from "./Layout";
import Chat from "./Chat";


export function App(): ReactElement {
   return (
          <Layout>
              <Chat/>
          </Layout>
  );
}