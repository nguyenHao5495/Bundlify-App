import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Heading, TextStyle, Card, Modal, Icon, Button, TextField } from '@shopify/polaris';
import { Table, Switch, Space, Popconfirm } from 'antd';
import Api from '../apis/RestFullApi';
import {
    EditMinor,
    DeleteMinor
} from '@shopify/polaris-icons';
import Bundle from '../pages/Bundle'
const { Column } = Table;
let dataTest = []

const AllOrder = ({ changeSelected }) => {
    const [data, setData] = useState(dataTest)
    const [searchTerm, setSearchTerm] = React.useState("");
    const [active, setActive] = useState(false);
    const [editData, seteditData] = useState();
    useEffect(() => {
        Api.listBundle().then((data) => {
            setData(data.data);
            dataTest = data.data
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    const onChangeSwitch = (value, key) => {
        console.log(value);
        let valueSwitch = "";
        if (value === true) {
            valueSwitch = '0'
        } else {
            valueSwitch = '1'
        }
        console.log(valueSwitch);
        if (valueSwitch) {
            setData(data.map((item) => {
                if (item.id === key.id) {
                    // Return a new object

                    return {
                        ...item,  // copy the existing item
                        enable_bundle: valueSwitch // replace the email addr
                    }

                }
                // Leave every other item unchanged
                return item;
            }),
            )
        }
        seteditData({
            ...key,
            enable_bundle: valueSwitch
        })
    }
    useEffect(() => {
        Api.updateBundleStatus(editData)
    }, [editData]);
    const onChangeSearch = useCallback((newValue) => setSearchTerm(newValue), []);
    useEffect(() => {
        if (searchTerm !== "") {
            const results = data.filter(person =>
                person.bundle_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setData(results);
        } else {
            setData(dataTest)
        }
    }, [searchTerm]);
    const changeEdit = (value) => {
        console.log(value);
        setActive(!active)
    };
    const handleDelete = (key) => {
        setData(
            data.filter((item) => item.id !== key),
        )
    };
    return (
        <div className="wrapper">
            <div className="Recent_Orders">
                <Card sectioned title="Recent Orders">
                    <Layout>
                        <Layout.Section>
                            <Card sectioned>
                                <div className="total_order_table">
                                    <div className="left">
                                        <Heading>0₫</Heading>
                                        <TextStyle variation="subdued">Total orders value</TextStyle>
                                    </div>
                                    <div className="center">
                                        <Heading>0₫</Heading>
                                        <TextStyle variation="subdued">Value off from offers</TextStyle>
                                    </div>
                                    <div className="right">
                                        <Heading>0</Heading>
                                        <TextStyle variation="subdued">Total orders</TextStyle>
                                    </div>
                                </div>
                            </Card>
                        </Layout.Section>
                    </Layout>
                </Card>

                <Card sectioned>
                    <Layout>
                        <Layout.Section oneThird>
                            <Heading>Manage Bundles</Heading>
                            <div className="btn_view">
                                <Button plain onClick={changeSelected}>Create new bundle</Button>
                            </div>
                        </Layout.Section>
                        <Layout.Section twoThird>
                            {data.length < 1 &&

                                <div className="status_Bundles" style={{ color: '#bf0711' }}>
                                    No bundle available ? Click{' '}
                                    <Button plain monochrome onClick={changeSelected}>
                                        here to
                                    </Button>
                                to create one.
                              </div>

                            }

                            <TextField value={searchTerm} onChange={onChangeSearch} placeholder="Search by bundle name..." />
                            <Table dataSource={data} rowKey={data => data.id}>
                                <Column
                                    dataIndex="bundle_name"
                                    key="bundle_name"
                                />
                                <Column
                                    render={(text, record) => (
                                        <div className="text-center">
                                            {record.enable_bundle == '1' ? <Switch checked={false} onChange={(value) => { onChangeSwitch(value, record) }} /> : <Switch checked={true} onChange={(value) => { onChangeSwitch(value, record) }} />}
                                        </div>
                                    )} />
                                <Column
                                    dataIndex="bundle_name"
                                    key="bundle_name"
                                    render={(text, record) => (
                                        <div className="text-center">
                                            <Space size="middle">
                                                <a className="btn_table" href="# " onClick={() => changeEdit(record)}>Edit <Icon source={EditMinor} /></a>
                                                <div className="delete-rule">
                                                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                                                        <a className="btn_table" href="javascriptvoid(0)">Delete <Icon source={DeleteMinor} /></a>
                                                    </Popconfirm>
                                                </div>
                                            </Space>

                                        </div>

                                    )} />
                            </Table>
                        </Layout.Section>
                    </Layout>
                </Card>
                <div style={{ width: '100%' }}>
                    <Modal
                        open={active}
                        onClose={changeEdit}
                        className="abc"
                        title="Edit bundle"
                        primaryAction={{
                            content: 'SAVE',
                            onAction: changeEdit,
                        }}
                        secondaryActions={[
                            {
                                content: 'CLOSE',
                                onAction: changeEdit,
                            },
                        ]}
                        large={true}
                    >
                        <Modal.Section>
                            <Bundle />

                        </Modal.Section>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default AllOrder;

