import react from "react";
import './FaceRecognition.css';

const FaceRecognition = ({inputUrl, boundingBox}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputimage' className="image pa4" alt='' src={inputUrl} />
                <div className="box" style={{top:boundingBox.topPos, bottom:boundingBox.bottomPos, left:boundingBox.leftPos, right:boundingBox.rightPos}}></div>                
            </div>

        </div>
    );    
}

export default FaceRecognition;
