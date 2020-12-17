import React from 'react';
import { Table, Popconfirm, List } from 'antd';
import { Card, Layout, Icon, Button, Heading, Select, TextStyle, FormLayout, TextField, Frame, Toast } from '@shopify/polaris';
import ListProduct from '../components/ListProduct';
import Optional from '../components/OptionalSettings';
import CreateData from '../components/createData'
import store from '../store'
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
            {
                id: "Rule01",
                Qty: "1",
                Amount: 5,
                checkamount: "percent_off"
            },
        ],
        count: 1,
        amount: 5,
        checkAmount: "percent_off",
        active: false
    }
    handleAdd = () => {
        const { count, dataSourceTable, amount } = this.state;
        const newData = {
            id: `Rule0${count + 1}`,
            Qty: String(count + 1),
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
                        Qty: value // replace the email addr
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
        //console.log('changed', value);
    }

    toastMarkup = this.state.active ? (
        <Toast content="Message sent" />
    ) : null;
    render() {
        const { dataSourceTable } = this.state;
        const dataListProduct = store.getState().dataSelect;
        console.log(dataSourceTable);
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
                                            <Button outline onClick={this.handleAdd}><Icon source={PlusMinor} />Add rule</Button>
                                        </div>
                                        <Table dataSource={dataSourceTable} rowKey={dataSourceTable => dataSourceTable.id} >

                                            <Column title="Total Qty"
                                                dataIndex="Qty"
                                                key="qty"
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
                                            <TextField type="text" label="Bundle message" value="Bundle and Save!" />
                                            <TextField type="text" label="Success message" value="Congrats on saving!" />
                                            <TextField type="text" label="Name (this is to help you identify the offer within the app)" value="A New Bundle" />
                                            <Select
                                                label="Bundle layout"
                                                options={BundleLayout}
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
                                        grid={{ gutter: 16, column: 6 }}
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
                                            {dataListProduct.length < 1 &&
                                                <span className="bottom">SAVE 5₫</span>
                                            }
                                            {dataListProduct.length > 0 &&
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

                            <CreateData />

                        </div>
                    </div>
                </div>
            </Frame>
        );
    }
}
const mapStateToProps = (state) => {
    //console.log("state:", state);
    return {
        getStore: state.getStore,
        dataSelect: state.dataSelect
    }
}
export default connect(mapStateToProps)(Bundle);
