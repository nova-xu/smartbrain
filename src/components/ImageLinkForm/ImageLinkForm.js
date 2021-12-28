import react from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onClickDetect}) => {
    return (
        <div>
            <p className="f3">
                {'This Magic Brain will detect faces in your pictures. Try it!'}
            </p>
            <div className='center'>
                <div className="center form pa4 br3 shadow-5">
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onClickDetect}>Detect</button>
                </div>
               
            </div>
        </div>
    );    
}

export default ImageLinkForm;