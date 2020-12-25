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
        err: ""
    }
    componentDidMount() {
        Api.listProduct().then((data) => {
            const data1 = [];
            for (let i = 0; i < data.data.length; i++) {
                data1.push(<Option key={data.data[i].id} product_id={data.data[i].id} value={data.data[i].image.src} title={data.data[i].title} handle={data.data[i].handle} product_quantity='1'>{data.data[i].title}</Option>)
            }
            this.setState({ dataListProduct: [...this.state.dataListProduct, ...data1] })
        }).catch((err) => {
            console.log(err);
        })
        this.setState({
            err: "Select at least one product and up"
        })
    }
    componentWillUpdate(nextProps, nextState) {

        if (nextState.dataSelect !== this.state.dataSelect) {
            let minimumQuantity = nextState.dataSelect.length;
            let hasMatchQuantity = store.getState().store2.dataTable.some(

                e => e.quantity == minimumQuantity
            );
            console.log(hasMatchQuantity, minimumQuantity);
            if (minimumQuantity == 0) {
                this.setState({
                    err: "Select at least one product and up"
                })

            } else if (!hasMatchQuantity) {
                this.setState({
                    err: `You need to setup a rule which has total quantity is: ${minimumQuantity}`
                })
            } else {
                this.setState({
                    err: ""
                })
            }
        }
        if (nextState.dataSelect.length < store.getState().store2.dataTable.length) {
            console.log("nho hon");
        }

        // if (nextState.dataSourceTable !== this.state.dataSourceTable || store.getState().store.dataSelect.length > 0) {
        //     let minimumQuantity = store.getState().store.dataSelect.length;
        //     let hasMatchQuantity = nextState.dataSourceTable.some(
        //         e => e.quantity == minimumQuantity
        //     );
        //     console.log(hasMatchQuantity, minimumQuantity);
        //     if (minimumQuantity == 0) {
        //         return "Select at least one product and up";
        //     } else if (!hasMatchQuantity) {
        //         return `You need to setup a rule which has total quantity is: ${minimumQuantity}`;
        //     } else {
        //         return null;
        //     }
        //     if (nextState.dataSourceTable.length < store.getState().store.dataSelect.length) {
        //         this.handleAdd();
        //     }
        // }

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
                {err &&
                    <span className="empty_product" >{err}</span>
                }
            </Card>
        );
    }
}

export default listProduct;
