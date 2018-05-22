import React from 'react'
import renderer from 'react-test-renderer'

import Card from './Card'

it('renders correctly', () => {
  const tree = renderer
    .create(<Card
      id='2' 
      listId='3'
      openModal=''
      percentage='47'
      note='test a card'
      members={[]}
    />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
