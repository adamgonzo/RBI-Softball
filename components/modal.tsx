import { Fragment, ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <Fragment>
      <div className="fixed inset-0 bg-black opacity-25"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6">{children}</div>
      </div>
    </Fragment>,
    document.getElementById('modal-root')!
  )
}

export default Modal
