import React from 'react';
import styled from 'styled-components';

type ModalType = {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  display?: boolean;
};

export const ModalWindow: React.FC<ModalType> = ({
  children,
  isOpened,
  setIsOpened,
}) => {
  return (
    <>
      {isOpened && (
        <ModalWrapper
          onMouseDown={() => setIsOpened(false)}
          backdrop={isOpened ? 'blur(15px)' : 'blur(0px)'}
        >
          <ModalContent onMouseDown={(e) => e.stopPropagation()}>
            <CloseIcon onClick={() => setIsOpened(false)}>X</CloseIcon>
            {children}
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

const ModalWrapper = styled.div<{ backdrop?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  backdrop-filter: ${(p) => p.backdrop};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: backdrop-filter 10s ease 10s;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0px 8px 29px rgba(0, 0, 0, 0.4);
`;

const CloseIcon = styled.div`
  width: 25px;
  user-select: none;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  color: #343434;
`;
