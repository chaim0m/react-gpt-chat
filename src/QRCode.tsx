import QRCode from "react-qr-code";
import {useLocation, useSearchParams} from 'react-router-dom';


const QRCodeComp = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") ?? ""
    let location = useLocation();
    const baseUrl = window.location.href.split(location.pathname)[0];
    const qrOpts: any = {
        zuckerman: "name=zuckerman&date=1943-01-18`",
        lubatkin: "name=lubatkin&date=1943-01-18`"
    }

    const url = qrOpts[name] ?? "" ? `${baseUrl}/chat?${qrOpts[name]}` : "";


    return (
        <div style={{
            background: 'white',
            padding: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <QRCode value={url} style={{width: '25vw', height: 'auto'}}/>
        </div>
    );
};

export default QRCodeComp;