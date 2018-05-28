import React from 'react'
import style from './style.css'
// import { Link } from 'react-router-dom'
// import {Check} from '../icons'
import {Icons} from 'oce-components/build'
// import Select from 'react-select'
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion'

// const Filter = () => (
//   <section className={style.filter}>
//     <div className={style.filter_item}>
//       <Select 
//         placeholder={'Select a plan...'}
//         options={[
//           { value: 'one', label: 'One' },
//           { value: 'two', label: 'Two' },
//         ]} />
//     </div>
//     <div className={style.filter_item}>
//       <Select
//         placeholder={'Select a process...'}
//         options={[
//         { value: 'one', label: 'One' },
//         { value: 'two', label: 'Two' },
//       ]} />
//     </div>
//     <div className={style.filter_item}>
//       <Select 
//         placeholder={'Select a commitment...'}
//         options={[
//           { value: 'one', label: 'One' },
//           { value: 'two', label: 'Two' },
//         ]} />
//     </div>
//     <div className={style.filter_item}>
//       <Select
//         placeholder={'Select an agent...'}
//         options={[
//         { value: 'one', label: 'One' },
//         { value: 'two', label: 'Two' },
//       ]} />
//     </div>
//   </section>
// )

const Canvas = (props) => {
  const {data} = props
  return (
      <div className={style.canvas_board + ' ' + style.wrapper_accordion}>
          <Accordion accordion={false} className={style.accordion}>
            <AccordionItem expanded className={style.accordion_item} hideBodyClassName>
              <AccordionItemTitle className={style.accordion_title + ' ' + style.title_plan} hideBodyClassName>
                <h3>{data.name}</h3>
                <div className={style.accordion_arrow} role='presentation' />
              </AccordionItemTitle>
              <AccordionItemBody className={style.accordion_body} hideBodyClassName={style.accordion_body_hidden}>
                {data.planProcesses.map((process, j) => (
                  <AccordionItem expanded key={j} className={style.accordion_item} hideBodyClassName>
                  <AccordionItemTitle key={j++} className={style.accordion_title + ' ' + style.title_process} hideBodyClassName>
                    <h3>{process.name}</h3>
                    <div className={style.accordion_arrow} role='presentation' />
                    {/* <div className={style.section_link + ' ' + style.white}>
                      <Link to={'/validate/process/' + process.id}>View process</Link>
                    </div> */}
                  </AccordionItemTitle>
                  <AccordionItemBody key={j + 2} className={style.accordion_body} hideBodyClassName={style.accordion_body_hidden}>
                    {process.committedInputs.map((commitment, z) => (
                      <AccordionItem key={z} className={style.accordion_item} hideBodyClassName>
                        <AccordionItemTitle key={z++} className={style.accordion_title + ' ' + style.title_commitment} hideBodyClassName>
                          <h3 key={z + 2}>{commitment.note ? commitment.note : commitment.action + ' ' + commitment.committedQuantity.numericValue + ' ' + commitment.committedQuantity.unit.name + ' of ' + commitment.resourceClassifiedAs.name}</h3>
                          <div className={style.accordion_arrow} role='presentation' />
                          {commitment.fulfilledBy.length > 0
                          ? ''
                          : <div className={style.section_empty}>Empty</div>}
                          {/* <div className={style.section_link}>
                            <Link to={'/validate/commitment/' + commitment.id}>View commitment</Link>
                          </div> */}
                        </AccordionItemTitle>
                          <AccordionItemBody key={z + 3} className={style.accordion_body} hideBodyClassName={style.accordion_body_hidden}>
                            {commitment.fulfilledBy.map((event, o) => (
                              <SingleValidation deleteValidation={props.deleteValidation} myId={props.myAgentId} createValidation={props.createValidation} key={o} style={style} event={event.fulfilledBy} />
                            ))}
                          </AccordionItemBody>
                        </AccordionItem>
                    ))}
                  </AccordionItemBody>
                </AccordionItem>
                ))}
              </AccordionItemBody>
            </AccordionItem>
        </Accordion>
    </div>
  )
}

const SingleValidation = ({style, event, createValidation, deleteValidation, myId}) => {
  let validations = []
  for (let i = 0; i < 2; i++) {
    if (event.validations[i]) {
      validations.push(<span key={i} className={style.validations_box + ' ' + style.validations_active} />)
    } else {
      validations.push(<span key={i} className={style.validations_box} />)
    }
  }
  
  let button
  if (event.validations.findIndex(item => Number(item.validatedBy.id) === Number(myId)) === -1 && event.validations.length >= 2) {
    button = ''
  } else if (event.provider.id === myId) {
    button = ''
  } else if (event.validations.some(item => Number(item.validatedBy.id) === Number(myId))) {
    let itemValidated = event.validations.find(item => Number(item.validatedBy.id) === Number(myId))
    button = <button className={style.actions_validate + ' ' + style.actions_unvalidate} onClick={() => deleteValidation(itemValidated.id)}>Cancel validation</button>
  } else {
    button = <button className={style.actions_validate} onClick={() => createValidation(event.id)}>Validate</button>
  }
  return (
    <div className={style.list_item}>
      <div className={style.item_info}>
        <div className={style.event_info}>
          <div className={style.actions_validations}>
            {validations}
          </div>
          <div className={style.infos_title}>
            <img alt='provider' src={event.provider.image} />
            <h3><b>{event.provider.name}</b> {event.action} <b>{event.affectedQuantity.numericValue + ' ' + event.affectedQuantity.unit.name}</b> in process: <b>{event.inputOf.name}</b></h3>
          </div>
          <div className={style.info_description}><p>{event.note}</p></div>
          <div className={style.event_secondary}>
            <span>{event.start}</span>
          </div>
          {button}
        </div>
        <div className={style.info_validation}>
          {event.validations
            ? event.validations.map((val, i) => (
              <div key={i} className={style.validation_item}><span><Icons.Check width='18' height='18' color='#00875A' /></span> {val.validatedBy.name} validated </div>
            ))
            : ''
          }
        </div>
      </div>
    </div>
  )
}

export default Canvas
