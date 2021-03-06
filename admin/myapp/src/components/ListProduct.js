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
                e => Number(e.quantity) === minimumQuantity,
            );
            console.log(hasMatchQuantity, minimumQuantity);
            if (minimumQuantity === 0) {
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
        const datatest = store.getState().store.dataSelect;
        const storeSelect = store.getState().store3.listProduct;
        let mapData = [];
        if (storeSelect && storeSelect.length > 0) {
            mapData = dataListProduct.filter(p =>
                storeSelect.some(e => e && e.product_id == p.key)
            );
            // mapData = storeSelect.map((e) => {
            //     return e.product_handle
            // });
            mapData = mapData.map((e) => {
                return e.props.title
            })
            console.log(mapData);
        } else if (datatest && datatest.length > 0) {
            mapData = datatest.map((e) => {
                return e.title
            })
        }
        return (
            <Card sectioned>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select products"
                    onChange={this.handleChange}
                    defaultValue={mapData}
                >
                    {dataListProduct}
                </Select>
                {err && mapData.length < 1 &&
                    <span className="empty_product" >{err}</span>
                }
            </Card>
        );
    }
}

// const ListProduct = () => {
//     const [dataSelect, setDataSelect] = useState([]);
//     const [dataListProduct, SetDataListProduct] = useState([]);
//     const [datatest, SetDatatest] = useState([]);
//     const [storeSelect, SetDataStoreSelect] = useState([]);
//     const [err, setErr] = useState("");
//     useEffect(() => {
//         Api.listProduct().then((data) => {
//             const data1 = [];
//             for (let i = 0; i < data.data.length; i++) {
//                 data1.push(<Option key={data.data[i].id} id={data.data[i].id} product_id={data.data[i].id} src={data.data[i].image.src} title={data.data[i].title} product_handle={data.data[i].handle} product_quantity='1'>{data.data[i].title}</Option>)
//             }
//             SetDataListProduct(data1)
//         }).catch((err) => {
//             console.log(err);
//         })
//         setErr("Select at least one product and up");
//         SetDatatest(store.getState().store.dataSelect);
//         SetDataStoreSelect(store.getState().store3.listProduct)

//     }, []);
//     useEffect(() => {
//         let minimumQuantity = dataSelect.length;
//         let hasMatchQuantity = store.getState().store2.dataTable.some(
//             e => Number(e.quantity) === minimumQuantity,
//         );
//         console.log(hasMatchQuantity, minimumQuantity);
//         if (minimumQuantity === 0) {
//             setErr("Select at least one product and up")

//         } else if (!hasMatchQuantity) {
//             setErr(`You need to setup a rule which has total quantity is: ${minimumQuantity}`)
//         } else {
//             setErr("")
//         }
//     }, [dataSelect]);
//     const handleChange = (value, option) => {
//         console.log(option);
//         setDataSelect(option)
//         store.dispatch({
//             type: "DATA_SUCCESS",
//             dataSelect: option
//         })
//     }
//     console.log(storeSelect);
//     return (
//         <div>
//             <Card sectioned>
//                 <p>{storeSelect.id}</p>
//                 <Select
//                     mode="multiple"
//                     style={{ width: '100%' }}
//                     placeholder="Select products"
//                     onChange={handleChange}
//                     defaultValue={datatest}
//                 >
//                     {dataListProduct}
//                 </Select>
//                 {err &&
//                     <span className="empty_product" >{err}</span>
//                 }
//             </Card>
//         </div>
//     );
// }

export default listProduct;


