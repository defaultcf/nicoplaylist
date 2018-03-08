import React from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const ImgHandle = SortableHandle(({ src }) => <img src={src} />);

const SortableItem = SortableElement(({value}) => (
  <div>
    <ImgHandle src={value.img} />
    <a href={value.url}>
      <p>{value.title}</p>
    </a>
  </div>
));

export default SortableContainer(({items}) => (
  <div id="npl-list">
    {items.map((value, index) => (
      <SortableItem key={index} index={index} value={value} />
    ))}
  </div>
));
