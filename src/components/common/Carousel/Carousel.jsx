import React, { useState } from "react";
import Carousel, { Modal, ModalGateway } from 'react-images';

const CarouselSection = props => {
    // daebugger
    const { items } = props;
    const images = items.map(i => { return { src: i } });

    let [modalIsOpen, setModalIsOpen] = useState(true);
    debugger;
    return (
        <Carousel views={images} />
        
    )
}

export default CarouselSection;

/*
<ModalGateway>
            {modalIsOpen ? (
                <Modal onClose={setModalIsOpen(false)}>
                    <Carousel views={images} />
                </Modal>
            ) : null}
        </ModalGateway>
*/