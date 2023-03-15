import React, { useEffect, useRef } from 'react'
import * as styled from "./Modal.styled";

export const Modal = ({ children, open, handleClose }) => {

    const ref = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    if (!open)
        return <></>
    return (
        <styled.PopupContainer>
            <styled.PopupWrapper ref={ref}>
                {children}
            </styled.PopupWrapper>
        </styled.PopupContainer>
    )
}
