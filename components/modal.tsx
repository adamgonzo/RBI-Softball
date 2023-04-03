// import { Fragment, ReactNode } from 'react'
// import ReactDOM from 'react-dom'

// interface ModalProps {
//   isOpen: boolean
//   onClose: () => void
//   children: ReactNode
// }

// const Modal = ({ isOpen, children }: ModalProps) => {
//   if (!isOpen) return null

//   return ReactDOM.createPortal(
//     <Fragment>
//       <div className="fixed inset-0 bg-black opacity-25"></div>
//       <div className="fixed inset-0 z-50 flex items-center justify-center">
//         <div className="bg-white rounded-lg p-6">{children}</div>
//       </div>
//     </Fragment>,
//     document.getElementById('modal-root')!
//   )
// }

// export default Modal

import { Fragment, ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <Fragment>
      <div className="fixed inset-0 bg-black opacity-25"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-end">
            <button
              className="p-2 text-black hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    </Fragment>,
    document.getElementById('modal-root')!
  )
}

export default Modal
