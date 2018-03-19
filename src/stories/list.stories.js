import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ListTemplate from '../list/listTemplate';

storiesOf('List', module)
  .add('simple list', () => {
    const id= 393939393
    const title= 'todo'
    return (
    <ListTemplate
      setTitle={false}
      name={title}
      id={id}
      openModal={()=>console.log('open modal')}
      moveCard={()=>console.log('move card')}
      openCardController={()=>console.log('open card controller')}
      moveCardAcrossLists={()=>console.log('move card across lists')}
      cardController={false}
      addCardToList={()=>console.log('add card to lsit')}
      updateNewCardTitle={()=>console.log('update new card title')}
      newCardTitle={''}
    />
  )})
