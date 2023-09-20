import React, { useContext, useRef } from 'react'
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import { GlobalContext } from './GlobalContext';


// Need to pass which type element can be draggable, its a simple string or Symbol. This is like an Unique ID so that the library know what type of element is dragged or dropped on
const type = "Image";

// Rendering individual images
const Image = ({ image, index, moveImage }) => {
    const ref = useRef(null); // Initialize the reference

    // useDrop hook is responsible for handling whether any item gets hovered or dropped on the element
    const [, drop] = useDrop({
        // Accept will make sure only these element type can be droppable on this element
        accept: type,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            // current element where the dragged element is hovered on
            const hoverIndex = index;
            // If the dragged element is hovered in the same place, then do nothing
            if (dragIndex === hoverIndex) {
                return;
            }
            // If it is dragged around other elements, then move the image and set the state with position changes
            moveImage(dragIndex, hoverIndex);
            /*
              Update the index for dragged item directly to avoid flickering
              when the image was half dragged into the next
            */
            item.index = hoverIndex;
        }
    });

    // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
    const [{ isDragging }, drag] = useDrag(() => ({
        // what type of item this to determine if a drop target accepts it
        type: type,
        // data of the item to be available to the drop methods
        item: { id: image.id, index },
        // method to collect additional data for drop handling like whether is currently being dragged
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }));

    /* 
      Initialize drag and drop into the element using its reference.
      Here we initialize both drag and drop on the same element (i.e., Image component)
    */
    drag(drop(ref));

    return (
        <div className="file-item" ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
            <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
        </div>
    );
};


const ImageList = ({ images }) => {
    const {setImageList} = useContext(GlobalContext)
    // render each image by calling Image component
    const renderImage = (image, index) => {
        return image ? (
            <Image
                image={image}
                index={index}
                key={`${image.id}-image`}
                moveImage={moveImage}
            />
        ) : null;
    };
    console.log(images)

    const moveImage = (dragIndex, hoverIndex) => {
        // Get the dragged element
        const draggedImage = images[dragIndex];
        /*
          - copy the dragged image before hovered element (i.e., [hoverIndex, 0, draggedImage])
          - remove the previous reference of dragged element (i.e., [dragIndex, 1])
          - here we are using this update helper method from immutability-helper package
        */
        setImageList(
          update(images, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
          })
        );
    };

    return (
        <div className='file-list'>
            {images.map(renderImage)}
        </div>
    )
}

export default ImageList