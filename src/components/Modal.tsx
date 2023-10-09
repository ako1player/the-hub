import ReactDOM from "react-dom";

//styles
import "./Modal.css"

const Modal = ({handleClose, children}:any) =>{
    return ReactDOM.createPortal((
        <div className="modal-backdrop">
          <div className="modal">
            {children}
            <button onClick={handleClose} className='btn'>Close</button>
          </div>
        </div>
      ), document.body)
}

export default Modal;