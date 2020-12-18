import React, { useState, useCallback, useEffect } from 'react';
import { Switch } from 'antd';
import { Layout, Card, FormLayout, TextField, Select, TextStyle, Button, Heading } from '@shopify/polaris';
import Api from '../apis/RestFullApi';
const options = [
    { label: 'Under Button Add To Cart', value: 'under_product_addcart' },
    { label: 'Under Product Title', value: 'under_product_title' },
    { label: 'Under Product Price', value: 'under_product_price' },
    { label: 'Under Product Description', value: 'under_product_description' },
];
console.log(options);
const optionsPrice = [
    { label: 'Price', value: '0' },
    { label: 'Percent', value: '1' },
];
const Settings = () => {
    //Value data
    const [maxValue, setMaxValue] = useState('1');
    const [valueSize, setValueSize] = useState('');
    const [textButton, settextButton] = useState('');
    const [valueTitleColor, setvalueTitleColor] = useState('');
    const [valueTitleBgColor, setvalueTitleBgColor] = useState('');
    const [valueBtnBgColor, setvalueBtnBgColor] = useState('');
    const [valueBtntextColor, setvalueBtntextColor] = useState('');
    const [textButtonDiscount, settextButtonDiscount] = useState('');
    const [valueSizeButton, setValueSizeButton] = useState('20');
    const [selected, setSelected] = useState('Under Button Add To Cart');
    const [selectedPrice, setSelectedPrice] = useState('Price');
    const [valueHTML, setHTML] = useState('');
    const [tagOrder, settagOrder] = useState('Bundle Advance');
    const [id, setId] = useState('');
    const [valueTextArea, setValueTextArea] = useState('');
    const [EnableValue, setEnableValue] = useState('');
    const [shop, setshop] = useState();
    //----------Call lần đầu tiên--------------//
    useEffect(() => {
        Api.listSettings().then((data) => {
            setId(data.data.id);
            setshop(data.data.shop)
            setMaxValue(data.data.max_bundles);
            settextButton(data.data.button_text);
            settextButtonDiscount(data.data.button_discount_text);
            setvalueBtnBgColor(data.data.button_background_color);
            setValueSizeButton(data.data.button_text_size);
            setValueSize(data.data.title_text_size);
            setvalueBtntextColor(data.data.button_text_color);
            setvalueTitleColor(data.data.title_text_color);
            setvalueTitleBgColor(data.data.title_background_color);
            setSelected(data.data.position);
            settagOrder(data.data.order_tag);
            setValueTextArea(data.data.custom_css);
            setSelectedPrice(data.data.typeRule)
            if (data.data.enable_admin_mode === "0") {
                setEnableValue(true)
            } else {
                setEnableValue(false)
            }
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    //Function
    const onChangeValueMax = useCallback((newValue) => {
        setMaxValue(newValue);
    }, [maxValue]);
    const valueTextButton = useCallback((newValue) => {
        settextButton(newValue)
    }, [textButton]);
    const onChangeValueTitleColor = useCallback((newValue) => {
        setvalueTitleColor(newValue.target.value)
    }, [valueTitleColor]);
    const onChangeValueTitleBgColor = useCallback((newValue) => {
        setvalueTitleBgColor(newValue.target.value)
    }, [valueTitleBgColor]);
    const valueColorBgButton = useCallback((newValue) => {
        setvalueBtnBgColor(newValue.target.value)
    }, [valueBtnBgColor]);
    const valueColorTextButton = useCallback((newValue) => {
        setvalueBtntextColor(newValue.target.value)
    }, [valueBtntextColor]);
    const valueTextButtonDiscount = useCallback((newValue) => {
        settextButtonDiscount(newValue)
    }, [textButtonDiscount]);
    const onChangeValueSize = useCallback((newValue) => {
        setValueSize(newValue)
    }, [valueSize]);
    const onChangeValueSizeButton = useCallback((newValue) => {
        setValueSizeButton(newValue)
    }, [valueSizeButton]);
    const handleSelectChange = useCallback((value) => {
        setSelected(value)
    }, [selected]);
    const handleSelectChangePrice = useCallback((value) => {
        console.log(value);
        setSelectedPrice(value)
    }, [selectedPrice]);
    const handleHTMLChange = useCallback((value) => {
        setHTML(value)
    }, [valueHTML]);
    const handleTagChange = useCallback((value) => {
        settagOrder(value)
    }, [tagOrder]);
    const onChangeEnable = useCallback((newValue) => {
        setEnableValue(newValue)
    }, [EnableValue]);

    const handleChangeTextArea = useCallback((newValue) => {
        setValueTextArea(newValue)
    }, [valueTextArea]);
    const settings = {
        id: id,
        max_bundles: maxValue,
        button_text: textButton,
        title_text_color: valueTitleColor,
        button_discount_text: textButtonDiscount,
        button_background_color: valueBtnBgColor,
        button_text_size: valueSizeButton,
        title_text_size: valueSize,
        button_text_color: valueBtntextColor,
        title_background_color: valueTitleBgColor,
        position: selected,
        order_tag: tagOrder,
        custom_css: valueTextArea,
        custom_position: null,
        enable_admin_mode: EnableValue,
        typeRule: selectedPrice,
        total_price_class: null,
        shop: shop,
    }
    const saveSetting = () => {
        if (settings["enable_admin_mode"] === true) {
            settings["enable_admin_mode"] = "0"
        } else {
            settings["enable_admin_mode"] = "1"
        }
        console.log(settings);
        Api.updateSettings(settings)
    }
    return (
        <div className="wrapper">
            <div className="Recent_Orders">

                <Card sectioned>
                    <Layout>
                        <Layout.Section oneThird>
                            <Heading>General Settings</Heading>
                        </Layout.Section>
                        <Layout.Section twoThird>
                            <Card sectioned>
                                <div className="bundles_show">
                                    <TextField label="Max bundles show on a product page" type="number" value={maxValue} onChange={onChangeValueMax} />
                                </div>
                            </Card>

                        </Layout.Section>
                    </Layout>

                </Card>
                <Card sectioned title="Text Settings">
                    <FormLayout>
                        <TextField type="text" label="Button Text" value={textButton} onChange={valueTextButton} />
                        <TextField type="text" label="Button Discount Text" value={textButtonDiscount} onChange={valueTextButtonDiscount} />

                    </FormLayout>
                </Card>
                <Card sectioned title="Design Settings">
                    <div className="color_layout">
                        <div className="color_settings">
                            <label>Title color</label>
                            <input type="color" className="regular-input" value={valueTitleColor} onChange={onChangeValueTitleColor}></input>
                        </div>
                        <div className="color_settings">
                            <label>Title background color</label>
                            <input type="color" className="regular-input" value={valueTitleBgColor} onChange={onChangeValueTitleBgColor}></input>
                        </div>
                        <div className="">
                            <TextField label="Title text size" type="number" value={valueSize} onChange={onChangeValueSize} />
                        </div>
                    </div>
                    <div className="color_layout">
                        <div className="color_settings">
                            <label>Button text color</label>
                            <input type="color" className="regular-input" value={valueBtntextColor} onChange={valueColorTextButton}></input>
                        </div>
                        <div className="color_settings">
                            <label>Button background color</label>
                            <input type="color" className="regular-input" value={valueBtnBgColor} onChange={valueColorBgButton}></input>
                        </div>
                        <div className="">
                            <TextField label="Button text size" type="number" value={valueSizeButton} onChange={onChangeValueSizeButton} />
                        </div>
                    </div>
                </Card>
                <Card sectioned title="Placement Settings">
                    <div className="margin--bottom--15">
                        <Select
                            label="Bundles will automatically display in this position"
                            options={options}
                            onChange={handleSelectChange}
                            value={selected}
                        />
                    </div>
                    <div className="margin--bottom--15">
                        <TextField
                            value={valueHTML}
                            onChange={handleHTMLChange}
                            label="Or if you have knowledge of HTML5 and CSS3, you can display bundle wherever you want"
                            type="text"
                        />

                    </div>
                    <div>
                        <Select
                            label="Type rule display"
                            options={optionsPrice}
                            onChange={handleSelectChangePrice}
                            value={selectedPrice}
                        />
                    </div>
                </Card>
                <Card sectioned title="Advance Settings">
                    <div className="margin--bottom--15">
                        <p>Enable Admin Mode</p>
                        <Switch checked={EnableValue} onChange={onChangeEnable} />
                    </div>
                    <div className="margin--bottom--15">
                        <TextField
                            value={tagOrder}
                            onChange={handleTagChange}
                            label="Tag of Orders"
                            type="text"
                        />
                        <TextStyle variation="subdued">All order created by app will have this tag.</TextStyle>
                    </div>
                    <div>
                        <p></p>
                        <TextField
                            label="Custom css"
                            value={valueTextArea}
                            onChange={handleChangeTextArea}
                            multiline={4}
                        />
                    </div>

                </Card>
                <div className="margin--top--15">
                    <Button>Update data</Button>
                </div>
                <div className="text-right margin--top--15 margin--bottom--15">
                    <Button primary onClick={saveSetting}>Save Setting</Button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
