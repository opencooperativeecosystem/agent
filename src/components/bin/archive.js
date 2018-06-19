import React from 'react'
import style from './style.css'
import { Textarea, Button } from 'oce-components/build'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import Alert from '../alert'
import Plan from "../../queries/getPlan";
import deleteProcess from "../../mutations/deleteProcess";
import { graphql, compose } from "react-apollo";
import { withHandlers } from 'recompose';


const ArchiveProcess = (props) => (
    <div>
        <h5 className={style.h5}>Are you sure to archive the process?</h5>
        <Button primary onClick={props.deleteProcess}>Archive</Button>
    </div>
)

export default compose(
    graphql(deleteProcess, { name: "deleteProcessMutation" }),
    withHandlers({
        deleteProcess: props => event => {
            event.preventDefault()
            props.deleteProcessMutation({
                variables: {
                    token: localStorage.getItem("oce_token"),
                    id: props.id
                },
                update: (store, { data }) => {
                    let planProcessesCache = store.readQuery({
                        query: Plan,
                        variables: {
                            token: localStorage.getItem("oce_token"),
                            planId: Number(props.planId)
                        }
                    });

                    const processToDeleteIndex = planProcessesCache.viewer.plan.planProcesses.findIndex(
                        proc => proc.id === props.id
                    );
                    planProcessesCache.viewer.plan.planProcesses.splice(processToDeleteIndex, 1)
                    store.writeQuery({
                        query: Plan,
                        variables: {
                            token: localStorage.getItem("oce_token"),
                            planId: Number(props.planId)
                        },
                        data: planProcessesCache
                    });
                }
            })
                .then(
                    data => {
                        console.log(data);
                    },
                    e => {
                        const errors = e.graphQLErrors.map(error => error.message);
                    }
                );
        }
    })
)
(ArchiveProcess);
