import { useState } from "react";

export const useLoginPopup = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return {isOpen, openPopup, closePopup};
}
export const useCommentPopup = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return {isOpen, openPopup, closePopup};
}

export const useAddPhotoPopup = (initialState = false) => {
    const [isPhotoOpen, setIsPhotoOpen] = useState(initialState);

    const openPhotoPopup = () => setIsPhotoOpen(true);
    const closePhotoPopup = () => setIsPhotoOpen(false);

    return {isPhotoOpen, openPhotoPopup, closePhotoPopup};
}

export const useRegisterPopup = (initialState = false) => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(initialState);

    const openRegisterPopup = () => setIsRegisterOpen(true);
    const closeRegisterPopup = () => setIsRegisterOpen(false);

    return {isRegisterOpen, openRegisterPopup, closeRegisterPopup};
}