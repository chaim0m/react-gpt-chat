import {ReactElement} from 'react';
import {Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import Chat from "./Chat";
import QRCodeComp from "./QRCode";


export function App(): ReactElement {
    return (
        <Routes>
            <Route path="/" element={<QRCodeComp/>}/>
            <Route path="qrcode" element={<QRCodeComp/>}/>
            <Route path="chat" element={<Layout><Chat/></Layout>}/>
        </Routes>

    );
}