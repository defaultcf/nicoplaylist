import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => (
  <a href={value.url}>
    <img src={value.img} />
    <p>{value.title}</p>
  </a>
));

export default SortableContainer(({items}) => (
  <div id="npl-list">
    {items.map((value, index) => (
      <SortableItem key={index} index={index} value={value} />
    ))}
  </div>
));
