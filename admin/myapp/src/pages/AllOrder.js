import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Heading, TextStyle, Card, Modal, Icon, Button, TextField, Pagination } from '@shopify/polaris';
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
    const [data, setData] = useState(dataTest);
    const [totalBundle, setTotalBundle] = useState(0);
    const [totalPage, settotalPage] = useState(0)
    const [searchTerm, setSearchTerm] = React.useState("");
    const [active, setActive] = useState(false);
    const [editData, seteditData] = useState();
    const [current, setCurrent] = useState(1);
    useEffect(() => {
        Api.listBundle(current).then((data) => {
            setData(data.data);
            dataTest = data.data;
        }).catch((err) => {
            console.log(err);
        })

    }, [data]);
    useEffect(() => {
        Api.listTotalBundle().then((data) => {
            setTotalBundle(data.data);
            settotalPage(Math.ceil(data.data / 10));
        }).catch((err) => {
            console.log(err);
        })
    });
    const onChangeSwitch = (value, key) => {
        console.log(value);
        let valueSwitch = "";
        if (value === true) {
            valueSwitch = '1'
        } else {
            valueSwitch = '0'
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
    useEffect(() => {
        Api.listBundle(current).then((data) => {
            setData(data.data);
            dataTest = data.data
        }).catch((err) => {
            console.log(err);
        })
    }, [current]);
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
        Api.deleteBundle(key.id).then((data) => {
        }).catch((err) => {
            console.log(err);
        })
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
                            <Table dataSource={data} rowKey={data => data.id} pagination={false}>
                                <Column
                                    dataIndex="bundle_name"
                                    key="bundle_name"
                                />
                                <Column
                                    render={(text, record) => (
                                        <div className="text-center">
                                            {record.enable_bundle === '0' ? <Switch checked={false} onChange={(value) => { onChangeSwitch(value, record) }} /> : <Switch checked={true} onChange={(value) => { onChangeSwitch(value, record) }} />}
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
                                                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                                                        <a className="btn_table" href="javascriptvoid(0)">Delete <Icon source={DeleteMinor} /></a>
                                                    </Popconfirm>
                                                </div>
                                            </Space>

                                        </div>

                                    )} />
                            </Table>
                            <div className="text-right margin--top--15 flex pagination_">
                                <div className="table_pagination">
                                    {current < totalPage &&
                                        <span>{(current - 1) * 10 + 1} - {(current - 1) * 10 + 10} of {totalBundle} rows</span>
                                    }
                                    {current === totalPage &&
                                        <span>{(current - 1) * 10 + 1} - {totalBundle} of {totalBundle} rows</span>
                                    }

                                </div>
                                <Pagination
                                    hasPrevious
                                    onPrevious={() => {
                                        if (current !== 1) {
                                            setCurrent(current - 1)
                                        }
                                    }}
                                    hasNext
                                    onNext={() => {
                                        if (current <= totalPage - 1) {
                                            setCurrent(current + 1)
                                        }
                                    }}
                                />
                            </div>
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

