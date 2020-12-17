import React, { Component } from 'react';
import { Select } from 'antd';
import { Card } from '@shopify/polaris';
import Api from '../apis/RestFullApi';


import store from '../store/index';
const { Option } = Select;

class listProduct extends Component {
    state = {
        dataSelect: [],
        dataListProduct: [],
        err: "Select at least one product and up"
    }
    componentDidMount() {
        Api.listProduct().then((data) => {
            const data1 = [];
            for (let i = 0; i < data.data.length; i++) {
                data1.push(<Option key={data.data[i].id} value={data.data[i].image.src} title={data.data[i].title}>{data.data[i].title}</Option>)
            }
            this.setState({ dataListProduct: [...this.state.dataListProduct, ...data1] })
        }).catch((err) => {
            console.log(err);
        })
    }
    handleChange = (value, option) => {
        this.setState({
            dataSelect: option
        })
        store.dispatch({
            type: "DATA_SUCCESS",
            dataSelect: option
        })
    }
    render() {
        const { dataSelect, err, dataListProduct } = this.state;
        console.log(dataListProduct);
        return (
            <Card sectioned>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select products"
                    onChange={this.handleChange}
                >
                    {dataListProduct}
                </Select>
                {dataSelect.length < 1 &&
                    <span className="empty_product" >{err}</span>
                }
            </Card>
        );
    }
}

export default listProduct;
