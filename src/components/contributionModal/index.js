import React from "react";
import { Textarea, Button, Icons } from "oce-components/build";
import { compose, withHandlers } from "recompose";
import moment from "moment";
import style from "./style.css";
import { Form, withFormik, Field } from "formik";
import * as Yup from "yup";
import { Query } from "react-apollo";
import { LoadingMini, ErrorMini } from "../loading";
import GetEvent from "../../queries/getEvent";
import {NavLink} from 'react-router-dom'

const NewCommModal = ({
  handleEvent,
  handleResource,
  setFieldValue,
  setFieldTouched,
  setSubmitting,
  errors,
  touched,
  values,
  client,
  resources,
  units,
  contributionId
}) => {
  return (
    <Query
      query={GetEvent}
      variables={{
        token: localStorage.getItem("oce_token"),
        id: Number(contributionId)
      }}
    >
      {({ loading, error, data, refetch }) => {
        if (loading) return <LoadingMini />;
        if (error)
          return (
            <ErrorMini refetch={refetch} message={`Error! ${error.message}`} />
          );
        console.log(data);
        return (
          <Form>
            <div style={{ padding: "16px", paddingBottom: 0 }}>
              <h1 className={style.commTitle}>Validate a contribution</h1>
              <div className={style.firstLine}>
                <div className={style.sentence}>
                  <div className={style.sentence_photo}  style={{backgroundImage: `url(${data.viewer.economicEvent.provider.image})`}}/>
                  <div className={style.sentence_text}>
                    <NavLink to={`/agent/${data.viewer.economicEvent.provider.id}`}>{data.viewer.economicEvent.provider.name}</NavLink> {` ${data.viewer.economicEvent.action} ${data.viewer.economicEvent.affectedQuantity.numericValue} ${data.viewer.economicEvent.affectedQuantity.unit.name} of ${data.viewer.economicEvent.inputOf.name}`}
                  </div>
                </div>
                <div className={style.date}>{moment(data.viewer.economicEvent.start).format("DD MMM")}</div>
              </div>
              <div className={style.note}>
                {data.viewer.economicEvent.note}
              </div>
              <div className={style.plan}><NavLink to={`/canvas/${data.viewer.economicEvent.inputOf.processPlan.id}`}>{data.viewer.economicEvent.inputOf.processPlan.name}</NavLink></div>
              <div className={style.validations}>
              {data.viewer.economicEvent.validations.map((val, i)=> (
                <div key={i} className={style.validations_item}>
                <div className={style.validations_main}>
                  <span className={style.icon}>
                    <Icons.Check width="18" height="18" color="#36B37E" />
                  </span>
                  <div className={style.main_name}>{val.validatedBy.name} validated</div>
                </div>
                <div className={style.validations_note}>
                  {val.validatedBy.note}
                </div>
              </div>
              ))}
              </div>
              {data.viewer.economicEvent.validations.length > 1 ?
                null :
                <div>
                <div
                className={style.textareaWrapper}
                style={{
                  height: "100px",
                  marginTop: "0px",
                  marginBottom: "0px"
                }}
              >
                <Field
                  name="note"
                  render={({ field /* _form */ }) => (
                    <Textarea
                      className={style.textarea}
                      name={field.name}
                      onChange={field.onChange}
                      placeholder="Write some note"
                    />
                  )}
                />
              </div>

              <div className={style.footer}>
                <Button>Validate</Button>
              </div>
            </div>
              }
              </div>
          </Form>
        );
      }}
    </Query>
  );
};

export default compose(
  withFormik({
    mapPropsToValues: props => ({
      event: "",
      note: "",
      resource: "",
      qty: "",
      unit: "",
      date: moment()
    }),
    validationSchema: Yup.object().shape({
      event: Yup.string().required(),
      note: Yup.string(),
      resource: Yup.string().required(),
      qty: Yup.number().required(),
      unit: Yup.string().required(),
      date: Yup.string()
    }),
    handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
      setSubmitting(true);
    }
  }),
  withHandlers({})
)(NewCommModal);
