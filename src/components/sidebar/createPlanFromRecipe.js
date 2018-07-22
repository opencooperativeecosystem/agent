import React from "react";
import style from "./style.css";
import { Icons, Input, Textarea, Button } from "oce-components/build";
import DatePicker from "react-datepicker";
import { withFormik, Form, Field } from "formik";
import Alert from "../alert";
import { compose } from "recompose";
import AsyncSelect from "react-select/lib/Async";
import { ApolloConsumer } from "react-apollo";
import getRecipes from "../../queries/getRecipes";
import * as Yup from "yup";
import { graphql } from "react-apollo";
import deleteNotification from "../../mutations/deleteNotification";
import updateNotification from "../../mutations/updateNotification";
import moment from "moment";
import createPlanFromRecipe from '../../mutations/createPlanFromRecipe'
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const DueDate = props => {
  const handleChange = value => {
    props.onChange("due", value);
  };
  return (
    <div>
      <DatePicker
        selected={props.value}
        onChange={handleChange}
        dateFormat={"DD MMM YYYY"}
        withPortal
      />
      {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  );
};

const CreatePlan = props => {
  const promiseOptions = (client, val) =>
    client
      .query({
        query: getRecipes,
        variables: { token: localStorage.getItem("oce_token") }
      })
      .then(res => {
        let options = res.data.viewer.allRecipes.map(recipe => ({
          value: recipe.id,
          label: recipe.name
        }));
        let newOpt = options.filter(i =>
          i.label.toLowerCase().includes(val.toLowerCase())
        );
        return newOpt;
      });
  const handleInputChange = val => {
    props.setFieldValue("recipe", val.value);
  };
  return (
    <ApolloConsumer>
      {client => (
        <div className={style.section_planCreation}>
          <div className={style.planCreation_info}>
            <h4 className={style.planCreation_title}>
              Create a plan from recipe
            </h4>
            <span onClick={() => props.togglePopup("")}>
              <Icons.Cross width="18" height="18" color="#f0f0f0" />
            </span>
          </div>
          <Form className={style.planCreation_wrapper}>
            <div className={style.form_select}>
              <AsyncSelect
                placeholder={"Select a recipe"}
                defaultOptions
                cacheOptions
                isClearable
                onChange={handleInputChange}
                loadOptions={val => promiseOptions(client, val)}
              />
            </div>
            <div className={style.form_input}>
              <Field
                name="recipeName"
                render={({ field }) => (
                  <Input {...field} placeholder="Type the plan name" />
                )}
              />
              {props.errors.recipeName &&
                props.touched.recipeName && (
                  <Alert>{props.errors.recipeName}</Alert>
                )}
            </div>
            <div className={style.formPlanWrapper}>
              <div className={style.form_note}>
                <Field
                  name="recipeNote"
                  render={({ field }) => (
                    <Textarea {...field} placeholder="What is the plan about" />
                  )}
                />
              </div>
              <div className={style.dates}>
                <div className={style.dateWrapper}>
                  <h5 className={style.dateName}>
                    <span style={{ verticalAlign: "sub" }}>
                      <Icons.Calendar width="16" height="16" color="#707BA0" />
                    </span>{" "}
                    Due
                  </h5>
                  <DueDate
                    value={props.values.recipeDue}
                    onChange={props.setFieldValue}
                    onBlur={props.setFieldTouched}
                    error={props.errors.recipeDue}
                    touched={props.touched.recipeDue}
                  />
                </div>
                <div className={style.form_button}>
                  <Button>Create</Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </ApolloConsumer>
  );
};

export default compose(
// graphql(createPlanFromRecipe, { name: "createPlanMutation" }),
//   graphql(updateNotification, {name: 'updateNotification'}),
//   graphql(deleteNotification, {name: 'deleteNotification'}),
  withFormik({
    mapPropsToValues: props => ({
      recipeName: "",
      recipeNote: "",
      recipeDue: moment(),
      recipe: ""
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      note: Yup.string(),
      due: Yup.string().required(),
      recipe: Yup.string().required()
    }),
    // handleRecipeSubmit: (values, { props }) => {
    //   let date = moment(values.recipeDue).format("YYYY-MM-DD");
    //   props
    //     .createPlanMutation({
    //       variables: {
    //         token: localStorage.getItem("oce_token"),
    //         name: values.recipeName,
    //         due: date,
    //         note: values.recipeNote,
    //         producesResourceClassificationId: values.recipe
    //       }
    //     })
    //     .then(data => {
    //       props.updateNotification({variables: {
    //         message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Plan {data.data.createPlan.plan.name} created successfully!</div>,
    //         type: 'success'
    //       }})
    //       .then(res => {
    //         setTimeout(() => {
    //          props.deleteNotification({variables: {id: res.data.addNotification.id}})
    //        }, 1000);
    //       })
    //        return props.history.push(`/canvas/${data.data.createPlan.plan.id}`);
    //     }, (e) => {
    //       const errors = e.graphQLErrors.map(error => error.message)
    //       props.updateNotification({variables: {
    //         message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
    //         type: 'alert'
    //       }})
    //       .then(res => {
    //         setTimeout(() => {
    //          props.deleteNotification({variables: {id: res.data.addNotification.id}})
    //        }, 1000);
    //       })
    //       props.setSubmitting(false)
    //    })
    // }
  })
)(CreatePlan);
