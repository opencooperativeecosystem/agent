import React from 'react'
import style from './style.css'
import { Link } from 'react-router-dom'
import ResourcesFlow from '../resourcesFlow'
import CardModal from '../components/cardModal'

class Canvas extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      lists: this.props.lists,
      modalSelected: null
    }
  }
  openModal (cardId, listId) {
    this.setState({
      ...this.state,
      modalIsOpen: true,
      modalSelected: cardId
    })
  }
    
  closeModal () {
    this.setState({modalIsOpen: false})
  }
  
  render () {
    const {modalSelected, modalIsOpen} = this.state
    const {data} = this.props
    let customHeight = window.innerHeight
    return (
      data
      ? <section className={style.surface} >
          <div className={style.canvas_board} style={{height: customHeight + 'px'} }>
            <ResourcesFlow
              openModal={this.openModal.bind(this)}
              closeModal={this.closeModal.bind(this)}
              title={data.name || data.planProcesses[0].name}
              project={data.scope}
              planId={data.id}
              outputs={data.planProcesses}
              lists={data.planProcesses.map(list => (
                {
                  id: Number(list.id),
                  title: list.name,
                  note: list.note,
                  due: list.plannedStart,
                  agents: list.workingAgents,
                  outputs: list.committedOutputs,
                  status: list.isFinished,
                  cards: list.committedInputs
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
                  ))
                }
              ))}
            />
          </div>
        <CardModal
          allPlanAgents={this.props.allPlanAgents}
          modalIsOpen={modalIsOpen}
          closeModal={this.closeModal.bind(this)}
          id={modalSelected}
          param={this.props.param}
        />
      </section>
      : <h1>loading</h1>
    )
  }
}

export default Canvas
