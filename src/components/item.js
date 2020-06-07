import React from 'react';

export const Item = (props) => {
  return (
    <div>
      {
        props.datos.map(item =>(
          <li key={item.id}>{item.name}-{item.fecha}</li>
        ))
      }      
    </div>
  )
}
