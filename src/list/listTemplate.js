import React from 'react'
import Card from '../card/card'
import style from './index.css'
import {More} from '../icons'
const ListTemplate = ({toggleActionPopupId, processStatus, updateProcess, actionPopupId, actionPopup, toggleActions, setTitle, name, agents, status, percentage, info, cards, outputs, id, openModal, moveCard, cardController, addCardToList, updateNewCardTitle, newCardTitle}) => {
  return (
  <div className={style.list_wrapper}>
    { actionPopup && Number(actionPopupId) === Number(id)
    ? <div className={style.list_actions}>
      <div className={style.actions_item} onClick={() => updateProcess(!status)}>
        <h5>Set as {status ? 'Incompleted' : 'Completed'}</h5>
      </div>
      {/* <div className={style.actions_item}>
        <h5>Edit due date</h5>
      </div> */}
    </div>
    : ''}
    <div className={style.list}>
      <div className={style.list_header}>
      <div className={style.header_first}>
        <h1 className={setTitle ? style.hidden + ' ' + style.header_title : style.header_title}>{name}</h1>
        <span className={style.header_menu} onClick={() => toggleActions(id)}>
          <More width='13' height='13' color='#999' />
        </span>
        </div>
        {info.note
        ? <p className={style.header_desc}>{info.note}</p>
        : ''}
        <div className={style.header_infos}>
          <div className={status ? style.header_processStatus : style.header_processStatus + ' ' + style.incomplete}>
            <h5>{status ? 'Completed' : 'Incompleted'}</h5>
            {info.due
            ? <div className={style.header_due}>
              <span className={style.due_item}>Due {info.due}</span>
            </div>
            : '' }
          </div>
        </div>
      </div>
      <div className={style.list_cards}>
        <h2>Commitments ({cards.length})</h2>
        {cards ? cards
        .map((card, i) => (
          <div key={i}>
            <Card
              key={card.id}
              listId={id}
              id={card.id}
              index={i}
              openModal={openModal}
              name={card.title}
              isFinished={card.isFinished}
              moveCard={moveCard}
              wip={card.wip}
              status={card.status}
              note={card.note || card.title}
              newNote={''}
              members={card.members}
              due={card.due}
              percentage={card.percentage}
            />
          </div>
        )) : ''}

        {/* <div className={cardController ? style.card_composer : style.card_composer + ' ' + style.hidden}>
          <div className={style.composer_card}>
            <div className={style.card_controller}>
              <div className={style.card_details}>
                <TextArea action={updateNewCardTitle} type={'white'} title={newCardTitle} />
              </div>
            </div>
          </div>
            <div className={style.card_controls}>
              <div className={style.controls_creation}>
                <Button action={()=> addCardToList(newCardTitle, id)} title={'Add'} />
                <a onClick={() => openCardController()} className={style.icon_delete} />
              </div>
            </div>
        </div> */}
      </div>
      {outputs.length !== 0 
      ? <div className={style.list_outputs}>
          <h2>Outputs ({outputs.length})</h2>
          {outputs.map((o, i) => (
            <div key={i} className={style.outputs_card}>
              <span>{o.resourceClassifiedAs.name}</span>
            </div>
          ))}
        </div>
      : '' }
      {/* <a className={style.open_card_composer} onClick={() => openCardController()} >Create a new commitment...</a> */}
    </div>
  </div>
)}

export default ListTemplate
