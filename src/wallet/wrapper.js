import {compose, withHandlers, lifecycle} from 'recompose'
import wallet from './index'
import request from 'request'
import fetchJsonp from 'fetch-jsonp'
const url = 'http://freecoin.seedbloom.it:3000'
const getList = '/wallet/v1/transactions/list'

export default compose(
    withHandlers({

        getTxs: props => () => {
            // var options = {
            //     url: 'http://freecoin.seedbloom.it:3000/wallet/v1/transactions/list',
            //     headers: {
            //       'ContentType': 'application/json',
            //       'Accept':'application/json'
            //     }
            //   };
            //   request({
            //       method: 'POST',
            //       uri: 'http://freecoin.seedbloom.it:3000/wallet/v1/transactions/list',
            //   })
            // axios({
            //     method: 'post',
            //     url: 'http://freecoin.seedbloom.it:3000/wallet/v1/transactions/list',
            //     headers: {'ContentType': 'application/json', 'Accept':'application/json' },
            //     mode: 'no-cors',
            //     data: {
            //       "blockchain": "mongo"
            //     }
            // })
            fetch('http://freecoin.seedbloom.it:3000/wallet/v1/transactions/list', {
                method: 'POST',
                 mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                  'ContentType': 'multipart/form-data',
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