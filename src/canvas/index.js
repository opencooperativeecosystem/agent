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
              percentage:
                task.fulfilledBy
                  .map(i => i.fulfilledQuantity.numericValue)
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    null
                  ) *
                100 /
                task.committedQuantity.numericValue
            }))}
          outputs={list.committedOutputs}
          id={list.id}
          status={list.isFinished}
          key={i}
          note={list.note}
          plannedStart={list.plannedStart}
          agents={list.workingAgents}
          name={list.name}
          planId={param}
          openModal={openModal}
          openCardController={() => toggleNewCommitmentModal(list.id, list.scope.id)}
        />
      ))}
      <NewBin
        relationships={relationships.map((rel, i) => (
          <option key={i} value={rel.object.id}>
            {rel.object.name}
          </option>
        ))}
        param={param}
      />
    </div>
  </section>
)};

export default Canvas;
