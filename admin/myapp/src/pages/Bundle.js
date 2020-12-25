import React from 'react';
import { Table, Popconfirm, List } from 'antd';
import { Card, Layout, Icon, Button, Heading, Select, TextStyle, FormLayout, TextField, Frame, Toast } from '@shopify/polaris';
import ListProduct from '../components/ListProduct';
import Optional from '../components/OptionalSettings';
import CreateData from '../components/createData'
import store from '../store';
import { ShopDoamin } from "../httpService/http-common";

import {
    PlusMinor,
    DeleteMinor,
    CirclePlusMinor
} from '@shopify/polaris-icons';
import { connect } from 'react-redux';

const { Column } = Table;
const options = [
    { label: 'Percent', value: 'percent_off' },
    { label: 'Fixed Price Off', value: 'fixed_price_off' },
    { label: 'Fixed Last Price', value: 'fixed_last_price' },
];
const BundleLayout = [
    { label: 'Inline', value: 'inline' },
    { label: 'Separate line', value: 'separate_line' },
];

class Bundle extends React.Component {

    state = {
        dataSourceTable: [
        ],
        count: 0,
        amount: 0,
        checkAmount: "percent_off",
        active: false,
        valueLayOut: "inline",
        bundleMessage: "Bundle and Save!",
        successMessage: "Congrats on saving!",
        nameBundle: "A New Bundle"
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.dataSourceTable !== this.state.dataSourceTable) {
            store.dispatch({
                type: "DATA_RULES",
                dataTable: nextState.dataSourceTable
            })
        }
        if (nextState.dataSourceTable.length < store.getState().store.dataSelect.length) {
            this.handleAdd();
        }

    }
    handleAdd = () => {
        const { count, dataSourceTable, amount } = this.state;
        const newData = {
            id: `Rule0${count + 1}`,
            quantity: String(count + 1),
            Amount: amount + 5,
            checkamount: "percent_off"
        };
        this.setState({
            dataSourceTable: [...dataSourceTable, newData],
            count: count + 1,
            amount: amount + 5,
            checkamount: "percent_off"
        });

    }
    handleDelete = (id) => {
        const { dataSourceTable } = this.state;
        this.setState({
            dataSourceTable: dataSourceTable.filter((item) => item.id !== id),
        });
    };
    onChange = (value, id) => {
        console.log(value, id);
        const { dataSourceTable } = this.state;
        this.setState({
            dataSourceTable: dataSourceTable.map((item, index) => {
                console.log(index);
                if (item.id === id) {
                    // Return a new object
                    return {
                        ...item,  // copy the existing item
                        quantity: value // replace the email addr
                    }
                }
                // Leave every other item unchanged
                return item;
            }),
        });
    }
    onChangeAmount = (value, id) => {
        const { dataSourceTable } = this.state;
        this.setState({
            dataSourceTable: dataSourceTable.map((item, index) => {
                console.log(index);
                if (item.id === id) {
                    // Return a new object
                    return {
                        ...item,  // copy the existing item
                        Amount: value // replace the email addr
                    }
                }
                // Leave every other item unchanged
                return item;
            }),
        });
    }
    onChange1 = (value, id) => {
        const { dataSourceTable } = this.state;
        this.setState({
            dataSourceTable: dataSourceTable.map((item, index) => {
                console.log(index);
                if (item.id === id) {
                    // Return a new object
                    return {
                        ...item,  // copy the existing item
                        checkamount: value // replace the email addr
                    }
                }
                // Leave every other item unchanged
                return item;
            },
            ),
        });
        //console.log('changed', value);
    }
    onChangeLayout = (value) => {
        console.log('changed', value);
        this.setState({
            valueLayOut: value
        })
    }
    onChangeBundlemessage = (value) => {
        this.setState({
            bundleMessage: value
        })
    }
    onChangesuccessmessage = (value) => {
        this.setState({
            successMessage: value
        })
    }
    onChangeNameBundle = (value) => {
        this.setState({
            nameBundle: value
        })
    }
    toastMarkup = this.state.active ? (
        <Toast content="Message sent" />
    ) : null;
    render() {
        const { dataSourceTable, valueLayOut, bundleMessage, successMessage, nameBundle } = this.state;
        const dataListProduct = store.getState().store.dataSelect;
        const dataBuldle = {
            bundle_name: nameBundle,
            bundle_msg: bundleMessage,
            bundle_layout: valueLayOut,
            success_msg: successMessage,
            enable_start_date: store.getState().store1.time.enable_start_date,
            start_date: store.getState().store1.time.start_date,
            enable_end_date: store.getState().store1.time.enable_end_date,
            end_date: store.getState().store1.time.end_date,
            require_logged_in: store.getState().store1.time.require_logged_in,
            enable_customer_tags: store.getState().store1.time.enable_customer_tags,
            customer_tags: store.getState().store1.time.customer_tags,
            shop: ShopDoamin,
            enable_bundle: "1",
            bundle_order: 0
        }
        return (
            <Frame>
                <div className="wrapper">
                    <div className="Recent_Orders">

                        <Card sectioned>
                            <Layout>
                                <Layout.Section oneThird>
                                    <Heading >1. Bundle Details</Heading>
                                    <TextStyle variation="subdued">Pick products and set the discount</TextStyle>
                                </Layout.Section>
                                <Layout.Section twoThird>
                                    <ListProduct data={dataSourceTable} />
                                    <Card sectioned>
                                        <div className="button_add_table">

                                            <Heading>Set discount rules</Heading>
                                            <Button outline onClick={this.handleAdd} primary><Icon source={PlusMinor} />Add rule</Button>
                                        </div>
                                        <Table dataSource={dataSourceTable} rowKey={dataSourceTable => dataSourceTable.id} >

                                            <Column title="Total Qty"
                                                dataIndex="quantity"
                                                key="quantity"
                                                render={(text, record) => (
                                                    <div className="regular-input input-table" >
                                                        <TextField type="number" min={1} value={String(text)} onChange={(value) => this.onChange(value, record.id)} />

                                                    </div>
                                                )} />
                                            <Column
                                                title="Discount Type"
                                                dataIndex="checkamount"
                                                key="checkamount"
                                                render={(text, record) => (
                                                    <Select
                                                        options={options}
                                                        onChange={(value) => this.onChange1(value, record.id)}
                                                        value={record.checkamount}
                                                    />
                                                )}
                                            />
                                            <Column
                                                title="Amount"
                                                dataIndex="Amount"
                                                key="Amount"
                                                render={(text, record) => (
                                                    <div className="regular-input input-table flex">
                                                        <TextField type="number" min={1} value={String(text)} onChange={(value) => this.onChangeAmount(value, record.id)} />
                                                        {record.checkamount === 'percent_off' &&
                                                            <div className="regular-input-after">%</div>
                                                        }

                                                    </div>
                                                )}
                                            />
                                            <Column

                                                render={(text, record) => (
                                                    <div className="delete-rule">
                                                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                                            <a href="javascriptvoid(0)"><Icon source={DeleteMinor} /></a>
                                                        </Popconfirm>
                                                    </div>
                                                )}
                                            />
                                        </Table>
                                    </Card>
                                    <Card sectioned>
                                        <FormLayout>
                                            <TextField type="text" label="Bundle message" value={bundleMessage} onChange={this.onChangeBundlemessage} />
                                            <TextField type="text" label="Success message" value={successMessage} onChange={this.onChangesuccessmessage} />
                                            <TextField type="text" label="Name (this is to help you identify the offer within the app)" value={nameBundle} onChange={this.onChangeNameBundle} />
                                            <Select
                                                label="Bundle layout"
                                                options={BundleLayout}
                                                value={valueLayOut}
                                                onChange={this.onChangeLayout}
                                            />
                                        </FormLayout>
                                    </Card>
                                </Layout.Section>

                            </Layout>
                        </Card>
                        <Card sectioned>
                            <Layout className="layout_section">

                                <Layout.Section oneThird>
                                    <Heading>Demo Preview</Heading>
                                    <TextStyle variation="subdued">The design can be changed in settings once the offer is created.</TextStyle>
                                </Layout.Section>
                                <Layout.Section twoThird>
                                    <List className="product--loop"
                                        grid={{ gutter: 16, column: 4 }}
                                        dataSource={dataListProduct}
                                        renderItem={item => (
                                            <List.Item>
                                                <div className="test">
                                                    <div className="product-item">
                                                        <div className="product-iamge">
                                                            <img src={item.value} alt={item.value} />
                                                        </div>
                                                        <div className="product-title">{item.title}</div>
                                                    </div>
                                                    <Icon
                                                        source={CirclePlusMinor} />
                                                </div>
                                            </List.Item>
                                        )}
                                    />

                                    <div className="btn_add">
                                        <Button fullWidth primary>
                                            <span className="top">Add Bundle</span>
                                            {dataListProduct && dataListProduct.length < 1 &&
                                                <span className="bottom">SAVE 5₫</span>
                                            }
                                            {dataListProduct && dataListProduct.length > 0 &&
                                                <span className="bottom">SAVE {dataListProduct.length * 5}₫</span>
                                            }
                                        </Button>
                                    </div>

                                </Layout.Section>
                            </Layout>
                        </Card>
                        <Card sectioned>
                            <Layout>
                                <Layout.Section oneThird>
                                    <Heading>2. Optional Settings</Heading>
                                    <TextStyle variation="subdued">All of the following are optional</TextStyle>
                                </Layout.Section>
                                <Layout.Section twoThird>
                                    <Optional />
                                </Layout.Section>
                                <Layout.Section oneThird></Layout.Section>
                            </Layout>
                        </Card>
                        <div className="text-right margin--top--15 margin--bottom--15">
                            <CreateData dataBuldle={dataBuldle} seclect={this.props.changeSelected} />

                        </div>
                    </div>
                </div>
            </Frame>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        getStore: state.store.getStore,
        dataSelect: state.store.dataSelect,
        starttime: {
            checkStart: state.store1.checkStart,
            valueTime: state.store1.valueTime
        },
        time: {
            checkStart: state.store1.checkStart,
            valueTimeStart: state.store1.valueTimeStart,
            checkEnd: state.store1.checkEnd,
            valueTimeEnd: state.store1.valueTimeEnd,
            checkLogin: state.store1.checkLogin,
            checkShowTag: state.store1.checkShowTag,
            valueTags: state.store1.valueTags
        },
        dataTable: state.store2.dataTable
    }
}
export default connect(mapStateToProps)(Bundle);
