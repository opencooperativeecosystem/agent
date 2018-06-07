import React from 'react'
import AgentRelationships from '../agentRelationships'
import {Panel, Icons, TxForm, DataBox, Feed, SupTitle, NavigationItem, Wrapper, Tag} from 'oce-components/build'
import style from './style.css'
const Economic = () => (
    <div className={{'font-size': '14px'}}>
      <b>Mario</b> sent 10.83774 ƒ to <b>Alekos</b>
    </div>
  );

const Wallet = ({match, relationships}) => (
    <div className={style.container}>
    <Panel icon={<Icons.Globe width="18" color="#f0f0f0" />} title="Assets">  
      <div className={style.space}><NavigationItem img={''} title={'FairCoin'} /></div>
    </Panel>
    <Panel icon={<Icons.Diary width="18" color="#f0f0f0" />} large title="Wallet">
        <div className={style.wallet_container}>
        <Wrapper>
        <SupTitle icon={<Icons.Activity width={18} height={18} color={'#fafafa'}/>} text={'Overview'}/>
        <div className={style.boxesWrapper}>
            <DataBox
            icon={<Icons.Diary width={18} height={18} color="#4C97F3" />}
            qt={129}
            title={"Movements"}
            />
            <DataBox
            icon={<Icons.Inventory width={18} height={18} color="#4C97F3" />}
            qt={"64,4948"}
            title={"Token Exchanged"}
            />
            <DataBox
            icon={<Icons.Home width={18} height={18} color="#4C97F3" />}
            qt={"192"}
            title={"Partecipant"}
            />
        </div>
        <div style={{'marginBottom': '20px', 'height': '364px', 'overflow': 'overlay'}}>
        <SupTitle icon={<Icons.Activity width={18} height={18} color={'#fafafa'}/>} text={'Overview'}/>
            <Feed
            image={"https://picsum.photos/200/300"}
            primary={<Economic />}
            secondary={<Tag>Test</Tag>}
            date={"28 May 2018"}
            />
        </div>
        <TxForm />
        </Wrapper>
        </div>
    </Panel>
    </div>
);

export default Wallet