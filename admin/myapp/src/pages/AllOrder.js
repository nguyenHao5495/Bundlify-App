import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Heading, TextStyle, Card, Modal, Icon, Button, TextField, Pagination } from '@shopify/polaris';
import { Table, Switch, Space, Menu, Dropdown } from 'antd';
import Api from '../apis/RestFullApi';
import {
    EditMinor,
    DeleteMinor,
    ViewMinor
} from '@shopify/polaris-icons';
import Bundle from '../pages/Bundle';
import { ShopDoamin } from "../httpService/http-common";
import store from '../store/index';
const { Column } = Table;
let dataTest = []

const AllOrder = ({ changeSelected }) => {
    const [data, setData] = useState(dataTest);
    const [totalOrder, settOtalOrder] = useState([]);
    const [totalOrdersVal, settOtalOrdersVal] = useState(0);
    const [totalValOff, settOtalValOff] = useState(0);
    const [totalBundle, setTotalBundle] = useState(0);
    const [totalPage, settotalPage] = useState(0)
    const [searchTerm, setSearchTerm] = React.useState("");
    const [active, setActive] = useState(false);
    const [bundle, setBundle] = useState("");
    const [editData, seteditData] = useState();
    const [current, setCurrent] = useState(1);


    useEffect(() => {
        Api.listBundle(current).then((data) => {
            console.log(data.data);
            setData(data.data);
            dataTest = data.data;
        }).catch((err) => {
            console.log(err);
        })
        Api.getorders().then((data) => {
            settOtalOrder(data.data);
            totalOrder.forEach(order => {
                let data = 0;
                data += Number(order.total_price);
                if (data > 0) {
                    settOtalOrdersVal(data)
                }
                if (order.discount_applications.length > 0) {
                    let discountCode = order.discount_applications.find(e => e.code.startsWith("OT_"));
                    if (discountCode) {
                        let dataOff = 0;
                        dataOff += Number(discountCode.value);
                        if (dataOff > 0) {
                            settOtalValOff(dataOff)
                        }
                    }
                }
            });
        }).catch((err) => {
            console.log(err);
        })

    }, []);
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a className="btn_action" href="# " onClick={(e) => { e.preventDefault(); changeEdit(bundle) }}><Icon source={EditMinor} /> Edit</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a className="btn_action" href="# " onClick={(e) => { e.preventDefault(); urlViewBundle(bundle) }}><Icon source={ViewMinor} />View</a>
            </Menu.Item>
            <Menu.Item key="3">
                <a className="btn_action" href="# " onClick={(e) => { e.preventDefault(); handleDelete(bundle) }}><Icon source={DeleteMinor} /> Delete</a>
            </Menu.Item>
        </Menu>
    );
    const listBundle = (current) => {
        console.log("current:", current);
        Api.listBundle(current).then((data) => {
            setData(data.data);
            dataTest = data.data;
        }).catch((err) => {
            console.log(err);
        })
    }
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
    const changeEdit = async (bundle) => {
        setActive(!active);
        let listProducts = [];
        let listRules = [];
        await Api.getSpecificProductsBundle(bundle.id).then((data) => {
            listProducts = data.data;
        }).catch((err) => {
            console.log(err);
        })
        await Api.getRulesBundle(bundle.id).then((data) => {
            listRules = data.data
        }).catch((err) => {
            console.log(err);
        })

        store.dispatch({
            type: "EDIT_BUNDLE",
            dataBundle: bundle,
            listProduct: listProducts,
            listRules: listRules

        })


    };
    const changeEditBundle = () => {

    }
    const handleDelete = (bunle) => {
        Api.deleteBundle(bunle.id).then((data) => {
            listBundle(current)
        }).catch((err) => {
            console.log(err);
        })
    };
    const urlViewBundle = (bunle) => {
        Api.urlView(bunle.id).then((data) => {
            console.log(data.data);
            window.open(`https://${ShopDoamin}/products/${data.data.slice(1, -1).replace('"', '')}`)
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="wrapper">
            <div className="Recent_Orders">
                <Card sectioned title="Recent Orders">
                    <Layout>
                        <Layout.Section>
                            <Card sectioned>
                                <div className="total_order_table">
                                    <div className="left">
                                        <Heading>{totalOrdersVal}₫</Heading>
                                        <TextStyle variation="subdued">Total orders value</TextStyle>
                                    </div>
                                    <div className="center">
                                        <Heading>{totalValOff}₫</Heading>
                                        <TextStyle variation="subdued">Value off from offers</TextStyle>
                                    </div>
                                    <div className="right">
                                        <Heading>{totalOrder.length}</Heading>
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
                                                <Dropdown overlay={menu} trigger={['click']}>
                                                    <a className="ant-dropdown-link" href="# " onClick={() => setBundle(record)}>
                                                        Action
                                                    </a>
                                                </Dropdown>
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
                                            const current1 = current - 1
                                            setCurrent(current1);
                                            listBundle(current1)
                                        }
                                    }}
                                    hasNext
                                    onNext={() => {
                                        if (current <= totalPage - 1) {
                                            const currentPlus = current + 1
                                            setCurrent(currentPlus);
                                            listBundle(currentPlus)
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
                            onAction: changeEditBundle,
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

