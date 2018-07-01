import React from 'react'
import ReactDOM from 'react-dom'
import Component from './index'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter() })

describe('Alert', () => {
    it('should render an alert', () => {
        const wrapper = shallow(<Component />)
        console.log(wrapper.debug())
    })
})