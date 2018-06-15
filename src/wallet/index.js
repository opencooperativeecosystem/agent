import React from 'react'
import {Panel, Icons, TxForm, DataBox, SupTitle, NavigationItem, Wrapper} from 'oce-components/build'
import style from './style.css'
// const Economic = () => (
//     <div className={{'font-size': '14px'}}>
//       <b>Mario</b> sent 10.83774 ƒ to <b>Alekos</b>
//     </div>
//   );

const Wallet = ({match, relationships}) => (
    <div className={style.container}>
    <Panel icon={<Icons.Globe width="18" color="#f0f0f0" />} title="Assets">  
      <div className={style.space}><NavigationItem img={''} title={'Temp'} /></div>
    </Panel>
    <Panel icon={<Icons.Diary width="18" color="#f0f0f0" />} large title="Test Wallet">
    <Wrapper>
    <SupTitle icon={<Icons.Activity width={18} height={18} color={'#fafafa'}/>} text={'Overview'}/>
      <div className={style.boxesWrapper}>
        <DataBox
          icon={<Icons.Diary width={18} height={18} color="#4C97F3" />}
          qt={'00.00'}
          title={"Undefined"}
        />
        <DataBox
          icon={<Icons.Inventory width={18} height={18} color="#4C97F3" />}
          qt={"00.00"}
          title={"Undefined"}
        />
        <DataBox
          icon={<Icons.Home width={18} height={18} color="#4C97F3" />}
          qt={"00.00"}
          title={"Undefined"}
        />
      </div>
      <div style={{'marginBottom': '20px'}}>
      <SupTitle icon={<Icons.Activity width={18} height={18} color={'#fafafa'}/>} text={'Overview'}/>
        {/* <Feed
          image={"https://picsum.photos/200/300"}
          primary={<Economic />}
          secondary={<Tag>Test</Tag>}
          date={"28 May 2018"}
        />
        <Feed
          image={"https://picsum.photos/200/300"}
          primary={<Economic />}
          secondary={<Tag>Test</Tag>}
          date={"28 May 2018"}
        />
        <Feed
          image={"https://picsum.photos/200/300"}
          primary={<Economic />}
          secondary={<Tag>Test</Tag>}
          date={"28 May 2018"}
        />
        <Feed
          image={"https://picsum.photos/200/300"}
          primary={<Economic />}
          secondary={<Tag>Test</Tag>}
          date={"28 May 2018"}
        />
        <Feed
          image={"https://picsum.photos/200/300"}
          primary={<Economic />}
          secondary={<Tag>Test</Tag>}
          date={"28 May 2018"}
        /> */}
      </div>
      <TxForm />
    </Wrapper>
  </Panel>
    </div>
);

export default Wallet