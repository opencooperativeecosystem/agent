import React from 'react'
import CardModal from '../components/cardModal'
import NewCommitmentModal from '../components/newCommitmentModal/wrapper'
import Bin from '../components/bin'
import {NewBin} from 'oce-components/build'
import style from './style.css'
import DatePicker from 'react-datepicker'
require('react-datepicker/dist/react-datepicker-cssmodules.css')

class Canvas extends React.Component {
  render () {
    const {data, modalSelected, relationships, modalIsOpen, openModal, closeModal, clicked, toggleClicked, newCommitmentIsOpen, toggleNewCommitmentModal} = this.props
    console.log(this.props.createProcess)
    const relationshipsArray = []
    relationships.map((rel, i) => (
      relationshipsArray.push(<option key={i} value={rel.object.id}>{rel.object.name}</option>)
    ))
    return (
      data
      ? <section className={style.canvasWrapper} >
        <div className={style.wrapperContainer}>
          {data.planProcesses.map((list, i) => (
            <Bin
              cards={list.committedInputs
              .filter(comm => comm.action === 'work')
              .map(task => (
                {
                  id: Number(task.id),
                  title: task.action + ' ' + task.committedQuantity.numericValue + ' ' + task.committedQuantity.unit.name + ' of ' + task.resourceClassifiedAs.name,
                  members: task.involvedAgents,
                  process: task.inputOf.name,
                  due: task.due,
                  note: task.note,
                  isFinished: task.isFinished,
                  percentage: task.fulfilledBy
                  .map(i => i.fulfilledQuantity.numericValue)
                  .reduce((accumulator, currentValue) => accumulator + currentValue, null) * 100 / task.committedQuantity.numericValue
                }
              ))}
              outputs={list.committedOutputs}
              id={list.id}
              status={list.isFinished}
              key={i}
              note={list.note}
              plannedStart={list.plannedStart}
              agents={list.workingAgents}
              name={list.name}
              openModal={openModal}
              openCardController={toggleNewCommitmentModal}
            />
          ))}
          <NewBin
            clicked={clicked}
            toggleClicked={toggleClicked}
            options={relationshipsArray}
            newName={this.props.newProcessName}
            newNote={this.props.newProcessNote}
            newScope={this.props.newProcessScope}
            newProcess={() => this.props.createProcess()}
            dateComponent={<DatePicker
              selected={this.props.start}
              onChange={this.props.newProcessDate}
              dateFormatCalendar={'DD MMM YYYY'}
              className='dateClass'
              withPortal
            />}
          />
        </div>
        <CardModal
          allPlanAgents={this.props.allPlanAgents}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          id={modalSelected}
          param={this.props.param}
        />
        <NewCommitmentModal
          modalIsOpen={newCommitmentIsOpen}
          closeModal={toggleNewCommitmentModal}
        />
      </section>
      : <h1>loading</h1>
    )
  }
}

export default Canvas
