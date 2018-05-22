import React, {Component} from 'react'
import ListTemplate from './listTemplate'

class List extends Component {
  constructor (props) {
    super(props)
    this.setTitle = this.setTitle.bind(this)
    this.updateNewCardTitle = this.updateNewCardTitle.bind(this)
    this.state = {
      setTitle: false,
      newCardTitle: ''
    }
  }

  updateNewCardTitle (e) {
    this.setState({
      ...this.state,
      newCardTitle: e.target.value
    })
  }

  setTitle () {
    this.setState({
      ...this.state,
      setTitle: !this.state.setTitle
    })
  }

  render () {
    const {name, agents, id, updateProcess, actionPopup, actionPopupId, toggleActions, toggleActionPopupId, cards, outputs, status, openModal, info} = this.props
    const {setTitle, cardController, newCardTitle} = this.state
    return (
      <span>
        <ListTemplate
          key={id}
          agents={agents}
          outputs={outputs}
          setTitle={setTitle}
          name={name}
          status={status}
          info={info}
          id={id}
          updateProcess={updateProcess}
          cards={cards}
          openModal={openModal}
          cardController={cardController}
          updateNewCardTitle={this.updateNewCardTitle}
          newCardTitle={newCardTitle}
          actionPopup={actionPopup}
          actionPopupId={actionPopupId}
          toggleActions={toggleActions}
          toggleActionPopupId={toggleActionPopupId}
        />
      </span>
    )
  }
}

export default List

