import React from 'react'
import CardModal from '../components/cardModal'
import Bin from '../components/bin'

class Canvas extends React.Component {
  render () {
    const {data, modalSelected, modalIsOpen, openModal, closeModal} = this.props
    let customHeight = window.innerHeight
    return (
      data
      ? <section >
        <div style={{height: customHeight + 'px'} }>
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
            />
          ))}
        </div>
        <CardModal
          allPlanAgents={this.props.allPlanAgents}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          id={modalSelected}
          param={this.props.param}
        />
      </section>
      : <h1>loading</h1>
    )
  }
}

export default Canvas
