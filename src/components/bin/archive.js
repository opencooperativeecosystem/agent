import React from 'react'
import style from './style.css'
import { Textarea, Icons, Button } from 'oce-components/build'
import * as Yup from 'yup'
import Alert from '../alert'
import Plan from "../../queries/getPlan";
import deleteProcess from "../../mutations/deleteProcess";
import { graphql, compose } from "react-apollo";
import { withHandlers } from 'recompose';
import updateNotification from "../../mutations/updateNotification";


const ArchiveProcess = (props) => (
    <div>
        <h5 className={style.h5}>Are you sure to archive the process?</h5>
        <Button primary onClick={props.deleteProcess}>Archive</Button>
    </div>
)

export default compose(
    graphql(deleteProcess, { name: "deleteProcessMutation" }),
    graphql(updateNotification, {name: 'updateNotification'}),

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
                        props.updateNotification({variables: {
                        message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Process archived successfully!</div>,
                        type: 'success'
                        }})
                    },
                    e => {
                        const errors = e.graphQLErrors.map(error => error.message);
                        props.updateNotification({variables: {
                        message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
                        type: 'alert'
                        }})
                    }
                );
        }
    })
)
(ArchiveProcess);
