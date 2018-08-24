import React from "react";
import Component from "./index";
import { graphql, withApollo } from "react-apollo";
import Claim from "../queries/getEvent";
import createValidation from "../mutations/createValidation";
import deleteValidation from "../mutations/deleteValidation";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import style from "./style.css";
import Header from "./header";
import ContributionModal from "../components/contributionModal/wrapper";
import { Select, Icons, Textarea, Panel } from "oce-components/build";
import { Field, withFormik } from "formik";
import * as Yup from "yup";
import updateNotification from "../mutations/updateNotification";
import deleteNotification from "../mutations/deleteNotification";
// import Alert from "../alert";

const DatePicker = ({ month, year }) => {
  return (
    <div className={style.datePicker}>
      <div className={style.datePicker_month}>
        <Field
          name="month"
          render={({ field /* _form */ }) => (
            <Select
              name={field.name}
              onChange={field.onChange}
              defaultValue={month}
            >
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </Select>
          )}
        />
      </div>
      <div className={style.datePicker_year}>
        <Field
          name="year"
          render={({ field /* _form */ }) => (
            <Select
              name={field.name}
              onChange={field.onChange}
              defaultValue={year}
            >
              <option value="2017">2017</option>
              <option value="2018">2018</option>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

class CanvasWrapper extends React.Component {
  render() {
    const {
      createValidation,
      deleteValidation,
      data,
      selectTab,
      tabId,
      tabName,
      modalIsOpen,
      modalId,
      toggleModal,
      values,
      handleChange
    } = this.props;
    return (
      <div className={style.container}>
        <Header
          agents={data.data.agentRelationships}
          selectTab={selectTab}
          tabId={tabId}
        />
        <div className={style.validation}>
          <Panel
            large
            icon={<Icons.Globe width="18" color="#f0f0f0" />}
            title={tabName}
            actions={<DatePicker month={values.month} year={values.year} />}
          >
            <Component
              data={data}
              values={values}
              tabId={tabId}
              toggleModal={toggleModal}
            />
          </Panel>
          <ContributionModal
            modalIsOpen={modalIsOpen}
            closeModal={toggleModal}
            toggleModal={toggleModal}
            contributionId={modalId}
            deleteValidation={deleteValidation}
            createValidation={createValidation}
            myId={data.data.id}
            handleChange={handleChange}
            note={
              <Field
                name="note"
                render={({ field /* _form */ }) => (
                  <Textarea className={style.textarea} {...field} placeholder="Type the validation note..." />
                )}
              />
            }
          />
        </div>
      </div>
    );
  }
}

const wrapperComponent = compose(
  graphql(createValidation, { name: "createValidationMutation" }),
  graphql(deleteValidation, { name: "deleteValidationMutation" }),
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  withFormik({
    mapPropsToValues: props => ({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      note: ""
    }),
    validationSchema: Yup.object().shape({
      month: Yup.number(),
      year: Yup.number(),
      note: Yup.string()
    })
  }),
  withState("tabId", "onSelectTab", null),
  withState("tabName", "onSelectTabName", null),
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withState("modalId", "selectModalId", null),
  withHandlers({
    toggleModal: props => contributionId => {
      props.selectModalId(contributionId);
      props.toggleModalIsOpen(!props.modalIsOpen);
    },
    selectTab: props => (id, name) => {
      props.onSelectTab(id);
      props.onSelectTabName(name);
    },
    createValidation: props => eventId => {
      return props
        .createValidationMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            validatedById: props.data.data.id,
            economicEventId: eventId,
            note: props.values.note
          },
          update: (store, { data }) => {
            let claimCache = store.readQuery({
              query: Claim,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(eventId)
              }
            });
            claimCache.viewer.economicEvent.validations.push({
              id: data.createValidation.validation.id,
              note: data.createValidation.validation.note,
              validatedBy: {
                id: data.createValidation.validation.validatedBy.id,
                name: data.createValidation.validation.validatedBy.name,
                __typename: "Person"
              },
              __typename: "Validation"
            });
            store.writeQuery({
              query: Claim,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(eventId)
              },
              data: claimCache
            });
          }
        })
        .then(
          data => {
            props
              .updateNotification({
                variables: {
                  message: (
                    <div style={{ fontSize: "14px" }}>
                      <span
                        style={{ marginRight: "10px", verticalAlign: "sub" }}
                      >
                        <Icons.Bell width="18" height="18" color="white" />
                      </span>Validation updated successfully!
                    </div>
                  ),
                  type: "success"
                }
              })
              .then(res => {
                setTimeout(() => {
                  props.deleteNotification({
                    variables: { id: res.data.addNotification.id }
                  });
                }, 1000);
              });
          },
          e => {
            const errors = e.graphQLErrors.map(error => error.message);
            props
              .updateNotification({
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
                  props.deleteNotification({
                    variables: { id: res.data.addNotification.id }
                  });
                }, 1000);
              });
          }
        );
    },
    deleteValidation: props => (eventId, valId) => {
      return props
        .deleteValidationMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: valId
          },
          update: (store, { data }) => {
            let claimCache = store.readQuery({
              query: Claim,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(eventId)
              }
            });
            let ValIndex = claimCache.viewer.economicEvent.validations.findIndex(
              item => Number(item.id) === Number(valId)
            );
            claimCache.viewer.economicEvent.validations.splice(ValIndex, 1);
            store.writeQuery({
              query: Claim,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(eventId)
              },
              data: claimCache
            });
          }
        })
        .then(
          data => {
            props
              .updateNotification({
                variables: {
                  message: (
                    <div style={{ fontSize: "14px" }}>
                      <span
                        style={{ marginRight: "10px", verticalAlign: "sub" }}
                      >
                        <Icons.Bell width="18" height="18" color="white" />
                      </span>Validation updated successfully!
                    </div>
                  ),
                  type: "success"
                }
              })
              .then(res => {
                setTimeout(() => {
                  props.deleteNotification({
                    variables: { id: res.data.addNotification.id }
                  });
                }, 1000);
              });
          },
          e => {
            const errors = e.graphQLErrors.map(error => error.message);
            props
              .updateNotification({
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
                  props.deleteNotification({
                    variables: { id: res.data.addNotification.id }
                  });
                }, 1000);
              });
          }
        );
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.selectTab(
        this.props.data.data.agentRelationships[0].object.id,
        this.props.data.data.agentRelationships[0].object.name
      );
    }
  })
)(CanvasWrapper);

export default withApollo(wrapperComponent);
