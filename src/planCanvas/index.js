import React from 'react'
import {Panel, Icons} from 'oce-components/build'
import Bin from '../components/bin'

export default () => (
  <div style={{display: 'initial'}}>
    <Panel large icon={<Icons.Globe width='18' color='#f0f0f0' />} title='Processes flow'>
      <Bin
        name={'A new process title'}
        note={'A new process note'}
        plannedStart='2018-05-25'
        id={938}
        updateProcess={() => console.log('hello')}
        actionPopup={() => console.log('hello')}
        actionPopupId={() => console.log('hello')}
        toggleActions={() => console.log('hello')}
        cards={[]}
        outputs={[]}
        status={false}
        openModal={() => console.log('hello')}
      />
      <Bin
        name={'A new process title'}
        note={'A new process note'}
        plannedStart='2018-05-25'
        id={938}
        updateProcess={() => console.log('hello')}
        actionPopup={() => console.log('hello')}
        actionPopupId={() => console.log('hello')}
        toggleActions={() => console.log('hello')}
        cards={[]}
        outputs={[]}
        status={false}
        openModal={() => console.log('hello')}
      />
      <Bin
        name={'A new process title'}
        note={'A new process note'}
        plannedStart='2018-05-25'
        id={938}
        updateProcess={() => console.log('hello')}
        actionPopup={() => console.log('hello')}
        actionPopupId={() => console.log('hello')}
        toggleActions={() => console.log('hello')}
        cards={[]}
        outputs={[]}
        status={false}
        openModal={() => console.log('hello')}
      />
    </Panel>
  </div>
)
