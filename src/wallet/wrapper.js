import {compose, withHandlers, lifecycle} from 'recompose'
import wallet from './index'
import request from 'request'
import axios from 'axios'
// import fetchJsonp from 'fetch-jsonp'
const url = 'http://freecoin.seedbloom.it:2000'
const getList = '/wallet/v1/transactions/list'

export default compose(
    withHandlers({

        getTxs: props => () => {
            axios.post(url + getList, {
                blockchain: 'mongo',
            })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        },
    }),
    lifecycle({
        componentDidMount () {
            console.log(this)
            this.props.getTxs()
        }
    })
)(wallet)