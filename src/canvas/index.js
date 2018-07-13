import React from "react";
import Bin from "../components/bin";
import style from "./style.css";
import NewBin from "../components/newBin";

const Canvas = ({
  data,
  relationships,
  param,
  openModal,
  toggleNewCommitmentModal
}) => {
  return (
  <section className={style.canvasWrapper}>
    <div className={style.wrapperContainer}>
      {data.planProcesses.map((list, i) => (
        <Bin
          cards={list.committedInputs
            // .filter(comm => comm.action === "work")
            .map((task, j) => ({
              action: task.action,
              id: Number(task.id),
              title:
                task.action +
                " " +
                task.committedQuantity.numericValue +
                " " +
                task.committedQuantity.unit.name +
                " of " +
                task.resourceClassifiedAs.name,
              members: task.involvedAgents,
              key: j,
              process: task.inputOf ? task.inputOf.name : task.outputOf.name,
              due: task.due,
              note: task.note,
              isFinished: task.isFinished,
            }))}
          outputs={list.committedOutputs.map((task, j) => ({
            action: task.action,
            id: Number(task.id),
            title:
              task.action +
              " " +
              task.committedQuantity.numericValue +
              " " +
              task.committedQuantity.unit.name +
              " of " +
              task.resourceClassifiedAs.name,
            key: j,
            process: task.inputOf ? task.inputOf.name : task.outputOf.name,
            due: task.due,
            note: task.note,
            isFinished: task.isFinished,
            members: task.involvedAgents,
          }))}
          id={list.id}
          status={list.isFinished}
          key={i}
          note={list.note}
          plannedStart={list.plannedStart}
          plannedFinish={list.plannedFinish}
          agents={list.workingAgents}
          name={list.name}
          planId={param}
          isDeletable={list.isDeletable}
          openModal={openModal}
          openCardController={() => toggleNewCommitmentModal(list.id, list.scope.id)}
          scope={list.scope.name}
          scopeId={list.scope.id}
          planStartDate={data.plannedOn}
          planDueDate={data.due}
          relationships={relationships.map((rel, i) => (
            <option key={i} value={rel.object.id}>
              {rel.object.name}
            </option>
          ))}
        />
      ))}
      <NewBin
        relationships={relationships.map((rel, i) => (
          <option key={i} value={rel.object.id}>
            {rel.object.name}
          </option>
        ))}
        param={param}
        startDate={data.plannedOn}
        due={data.due}
      />
    </div>
  </section>
)};

export default Canvas;
