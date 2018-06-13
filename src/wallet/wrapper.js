import {compose, withHandlers, lifecycle} from 'recompose'
import wallet from './index'
import request from 'request'
// import fetchJsonp from 'fetch-jsonp'
const url = 'http://freecoin.seedbloom.it:2000'
const getList = '/wallet/v1/transactions/list'

export default compose(
    withHandlers({

        getTxs: props => () => {
            fetch(url + getList, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                },
                body: JSON.stringify({
                    blockchain: 'mongo',
                })
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
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