import { createContext, useState, useContext, ReactNode } from "react";

type ModalType = 'signin' | 'login' | 'forgetPassword' | null;

interface ModalContextType {
    modalType: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () : ModalContextType => {
    const context = useContext(ModalContext)
    if(!context){
        throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    const [modalType, setModalType] = useState<ModalType>(null);

    const openModal = (type: ModalType) => setModalType(type);
    const closeModal = () => setModalType(null);

    return(
        <ModalContext.Provider value={{modalType, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}


// //Without TS ======>
// import React, { createContext, useState, useContext } from 'react';

// // Create context for modal
// const ModalContext = createContext();

// export const useModal = () => {
//   return useContext(ModalContext); // Custom hook for consuming modal context
// };

// export const ModalProvider = ({ children }) => {
//   const [modalType, setModalType] = useState(null);

//   const openModal = (type) => {
//     setModalType(type); // Open modal of specific type
//   };

//   const closeModal = () => {
//     setModalType(null); // Close modal
//   };

//   return (
//     <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };
