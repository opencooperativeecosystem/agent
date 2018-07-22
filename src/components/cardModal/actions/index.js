import React from "react";
import style from "../index.css";
import { Button, Textarea, Icons, Tooltip } from "oce-components/build";
import { compose, withState, withHandlers } from "recompose";
import UpdateCommitment from "../../../mutations/updateCommitment";
import GetPlan from "../../../queries/getPlan";
import { graphql, Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import updateNotification from "../../../mutations/updateNotification";
import deleteNotification from "../../../mutations/deleteNotification";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import Alert from "../../alert";
import DeleteCommitment from "../../../mutations/deleteCommitment";
import DatePicker from "react-datepicker";
import NCM from "./editCommitment";
import moment from "moment";
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const EditNote = compose(
  graphql(UpdateCommitment, { name: "updateCommitmentMutation" }),
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  withFormik({
    mapPropsToValues: props => ({ note: props.note || "" }),
    validationSchema: Yup.object().shape({
      note: Yup.string().required()
    }),
    handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
      props
        .updateCommitmentMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: props.id,
            note: values.note
          },
          update: (store, { data }) => {
            const commitment = store.readFragment({
              id: `${data.updateCommitment.commitment.__typename}-${
                data.updateCommitment.commitment.id
              }`,
              fragment: gql`
                fragment myCommitment on Commitment {
                  id
                  note
                }
              `
            });
          }
        })
        .then(
          data => {
            props.updateNotification({
              variables: {
                message: (
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                      <Icons.Bell width="18" height="18" color="white" />
                    </span>Note updated successfully!
                  </div>
                ),
                type: "success"
              }
            })
            .then(res => {
              setTimeout(() => {
               props.deleteNotification({variables: {id: res.data.addNotification.id}})
             }, 1000);
            })
          },
          e => {
            const errors = e.graphQLErrors.map(error => error.message);
            props.updateNotification({
              variables: {
                message: (
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                      <Icons.Cross width="18" height="18" color="white" />
                    </span>
                    {errors}
                  </div>
                ),
                type: "alert"
              }
            })
            .then(res => {
              setTimeout(() => {
               props.deleteNotification({variables: {id: res.data.addNotification.id}})
             }, 1000);
            })
          }
        );
    }
  })
)(props => (
  <div className={style.editWrapper}>
    <Form>
      <span className={style.form_note}>
        <Field
          name="note"
          render={({ field /* _form */ }) => (
            <div className={style.editWrapperNote}>
              <Textarea {...field} placeholder="Type the process note..." />
            </div>
          )}
        />
        {props.errors.note &&
          props.touched.note && <Alert>{props.errors.note}</Alert>}
      </span>
      <Button>Update note</Button>
    </Form>
  </div>
));

const DeleteNote = compose(
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" })
)(props => (
  <Mutation
    mutation={DeleteCommitment}
    update={(cache, { data }) => {
      let planCache = cache.readQuery({
        query: GetPlan,
        variables: {
          token: localStorage.getItem("oce_token"),
          planId: Number(props.planId)
        }
      });

      const processToDeleteIndex = planCache.viewer.plan.planProcesses.findIndex(
        proc => proc.id === props.processId
      );
      const commitmentToDeleteIndex = planCache.viewer.plan.planProcesses[
        processToDeleteIndex
      ].committedInputs.findIndex(proc => proc.id === props.id);
      planCache.viewer.plan.planProcesses[
        processToDeleteIndex
      ].committedInputs.splice(commitmentToDeleteIndex, 1);
      cache.writeQuery({
        query: GetPlan,
        variables: {
          token: localStorage.getItem("oce_token"),
          planId: Number(props.planId)
        },
        data: planCache
      });
    }}
  >
    {deleteCommitment => (
      <div className={style.editWrapper}>
        <h4>Are you sure to delete the commitment?</h4>
        <Button
          onClick={() => {
            deleteCommitment({
              variables: {
                token: localStorage.getItem("oce_token"),
                id: props.id
              }
            }).then(
              data => {
                props.closeModal();
                props.updateNotification({
                  variables: {
                    message: (
                      <div style={{ fontSize: "14px" }}>
                        <span
                          style={{ marginRight: "10px", verticalAlign: "sub" }}
                        >
                          <Icons.Bell width="18" height="18" color="white" />
                        </span>Commitment archived successfully!
                      </div>
                    ),
                    type: "success"
                  }
                })
                .then(res => {
                  setTimeout(() => {
                   props.deleteNotification({variables: {id: res.data.addNotification.id}})
                 }, 1000);
                })
              },
              e => {
                const errors = e.graphQLErrors.map(error => error.message);
                props.updateNotification({
                  variables: {
                    message: (
                      <div style={{ fontSize: "14px" }}>
                        <span
                          style={{ marginRight: "10px", verticalAlign: "sub" }}
                        >
                          <Icons.Cross width="18" height="18" color="white" />
                        </span>
                        {errors}
                      </div>
                    ),
                    type: "alert"
                  }
                })
                .then(res => {
                  setTimeout(() => {
                   props.deleteNotification({variables: {id: res.data.addNotification.id}})
                 }, 1000);
                })
              }
            );
          }}
          primary
        >
          Delete commitment
        </Button>
      </div>
    )}
  </Mutation>
));

const DueDate = props => {
  const handleChange = value => {
    props.onChange("due", value);
  };
  return (
    <div className={style.dateWrapper}>
      <DatePicker
        selected={props.value}
        onChange={handleChange}
        dateFormat={"DD MMM YYYY"}
      />
      {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  );
};

const EditDate = compose(
  graphql(UpdateCommitment, { name: "updateCommitmentMutation" }),
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  withFormik({
    mapPropsToValues: props => ({ due: moment(props.dueDate) }),
    validationSchema: Yup.object().shape({
      due: Yup.string().required()
    }),
    handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
      props
        .updateCommitmentMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: props.id,
            due: moment(values.due).format("YYYY-MM-DD")
          },
          update: (store, { data }) => {
            const commitment = store.readFragment({
              id: `${data.updateCommitment.commitment.__typename}-${
                data.updateCommitment.commitment.id
              }`,
              fragment: gql`
                fragment myCommitment on Commitment {
                  id
                  due
                }
              `
            });
          }
        })
        .then(
          data => {
            props.updateNotification({
              variables: {
                message: (
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                      <Icons.Bell width="18" height="18" color="white" />
                    </span>Note updated successfully!
                  </div>
                ),
                type: "success"
              }
            })
            .then(res => {
              setTimeout(() => {
               props.deleteNotification({variables: {id: res.data.addNotification.id}})
             }, 1000);
            })
          },
          e => {
            const errors = e.graphQLErrors.map(error => error.message);
            props.updateNotification({
              variables: {
                message: (
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                      <Icons.Cross width="18" height="18" color="white" />
                    </span>
                    {errors}
                  </div>
                ),
                type: "alert"
              }
            })
            .then(res => {
              setTimeout(() => {
               props.deleteNotification({variables: {id: res.data.addNotification.id}})
             }, 1000);
            })
          }
        );
    }
  })
)(props => (
  <div className={style.editWrapper}>
    <Form>
      <DueDate
        value={props.values.due}
        onChange={props.setFieldValue}
        onBlur={props.setFieldTouched}
        error={props.errors.start}
        touched={props.touched.start}
      />
      <Button>Update Due date</Button>
    </Form>
  </div>
));

const Standard = () => <h1>null</h1>;
const Actions = props => {
  let content = "";
  let styled = "";
  let Children = Standard;
  if (props.content == "commitment") {
    content = "Edit commitment";
    styled = style.one;
    Children = NCM;
  } else if (props.content == "note") {
    content = "Edit note";
    styled = style.two;
    Children = EditNote;
  } else if (props.content == "due") {
    content = "Edit due";
    styled = style.three;
    Children = EditDate;
  } else if (props.content == "delete") {
    content = "Delete the commitment";
    styled = style.four;
    Children = DeleteNote;
  }
  return (
    <ApolloConsumer>
      {client => (
        <div className={style.content_buttons}>
          {props.showTooltip ? (
            <div className={style.content_tooltip + " " + styled}>
              <Tooltip
                handleActionsPopup={() =>
                  props.onhandleShowTooltip(props.content)
                }
                title={content}
              >
                <Children
                  client={client}
                  closeModal={props.close}
                  planId={props.planId}
                  id={props.id}
                  processId={props.processId}
                  dueDate={props.data.due}
                  scopeId={props.scopeId}
                  note={props.data.note}
                />
              </Tooltip>
            </div>
          ) : null}
          <h2>Actions</h2>
          <div className={style.buttons_list}>
            <div className={style.list_single}>
              <Button
                gray
                onClick={() => props.onhandleShowTooltip("commitment")}
              >
                <span className={style.button_icon}>
                  <Icons.Activity width="14" height="14" color="#4c4c4c" />
                </span>{" "}
                Edit commitment
              </Button>
            </div>
            <div className={style.list_single}>
              <Button gray onClick={() => props.onhandleShowTooltip("note")}>
                <span className={style.button_icon}>
                  <Icons.Text width="14" height="14" color="#4c4c4c" />
                </span>{" "}
                Edit note
              </Button>
            </div>
            <div className={style.list_single}>
              <Button gray onClick={() => props.onhandleShowTooltip("due")}>
                <span className={style.button_icon}>
                  <Icons.Activity width="14" height="14" color="#4c4c4c" />
                </span>{" "}
                Edit due date
              </Button>
            </div>
            <div className={style.list_single}>
              <Button
                gray
                onClick={() => props.updateCommitment(!props.data.isFinished)}
              >
                Set {props.data.isFinished ? "Incompleted" : "Completed"}
              </Button>
            </div>
            <div className={style.list_single}>
              <Button
                primary
                onClick={() => props.onhandleShowTooltip("delete")}
              >
                <span className={style.button_icon}>
                  <Icons.Cross width="14" height="14" color="#fff" />
                </span>{" "}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </ApolloConsumer>
  );
};

export default compose(
  withState("showTooltip", "handleTooltip", false),
  withState("content", "handleContent", ""),
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  graphql(UpdateCommitment, {
    props: ({ mutate, ownProps: { id } }) => ({
      updateCommitmentMutation: mutate
    })
  }),
  withHandlers({
    onhandleShowTooltip: props => content => {
      if (props.content === content) {
        return props.handleTooltip(!props.showTooltip);
      }
      props.handleContent(content);
      props.handleTooltip(true);
    },
    updateCommitment: ({
      updateCommitmentMutation,
      updateNotification,
      deleteNotification,
      id,
      planId
    }) => status => {
      return updateCommitmentMutation({
        variables: {
          token: localStorage.getItem("oce_token"),
          id: id,
          isFinished: status
        },
        update: (store, { data }) => {
          const commitment = store.readFragment({
            id: `${data.updateCommitment.commitment.__typename}-${
              data.updateCommitment.commitment.id
            }`,
            fragment: gql`
              fragment myCommitment on Commitment {
                id
                isFinished
                note
              }
            `
          });
        }
      })
        .then(data =>
          updateNotification({
            variables: {
              message: (
                <div style={{ fontSize: "14px" }}>
                  <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                    <Icons.Bell width="18" height="18" color="white" />
                  </span>Process updated successfully!
                </div>
              ),
              type: "success"
            }
          })
          .then(res => {
            setTimeout(() => {
             deleteNotification({variables: {id: res.data.addNotification.id}})
           }, 1000);
          })
        )
        .catch(e => {
          console.log(e)
          console.log(e.graphQLErrors)
          const errors = e.graphQLErrors.map(error => error.message);
          updateNotification({
            variables: {
              message: (
                <div style={{ fontSize: "14px" }}>
                  <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                    <Icons.Cross width="18" height="18" color="white" />
                  </span>
                  {errors}
                </div>
              ),
              type: "alert"
            }
          })
          .then(res => {
            setTimeout(() => {
             deleteNotification({variables: {id: res.data.addNotification.id}})
           }, 1000);
          })
        });
    }
  })
)(Actions);
