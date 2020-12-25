import { HTTP } from "../httpService/http-common";
import { ShopDoamin } from "../httpService/http-common";
import store from '../store/index';
export default {
    listProduct: () => HTTP.get(`admin/services.php?shop=${ShopDoamin}&action=getProducts&since_id=1&limit=50`),
    listSettings: () => HTTP.get(`/admin/services.php?shop=${ShopDoamin}&action=getSettings`),
    updateSettings: (data) => {
        let formData = new FormData();
        formData.append("settings", JSON.stringify(data));
        formData.append("action", "saveSettings");
        formData.append("shop", ShopDoamin);
        console.log(...formData);
        HTTP.post(`/admin/services.php?shop=${ShopDoamin}&action=saveSettings`, formData)
            .then(res => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
    },
    createBundle: (data) => {
        let formData = new FormData();
        formData.append("bundle", JSON.stringify(data));
        formData.append("action", "createBundle");
        formData.append("shop", ShopDoamin);
        console.log(...formData);
        creatRules(3)
        // return (
        //     HTTP.post(`/admin/services.php?shop=${ShopDoamin}&action=saveSettings`, formData)
        //         .then(res => {
        //             console.log(res.data);
        //             if (res) {
        //                 creatProduct(res.data)
        //             }
        //         }).catch((err) => {
        //             console.log(err);
        //         })
        // )
    },
    listBundle: () => HTTP.get(`/admin/services.php?shop=${ShopDoamin}&action=getBundles&page=1`),
    updateBundleStatus: (data) => {
        console.log(data);

        if (data) {
            let formData = new FormData();
            formData.append("bundle_id", data.id);
            formData.append("action", "updateBundleStatus");
            formData.append("enable_bundle", data.enable_bundle);
            formData.append("shop", ShopDoamin);
            console.log(...formData);
            return (
                HTTP.post(`/admin/services.php`, formData)
            )
        }
    },

}
const creatProduct = (id) => {
    console.log(id);
    const listProducts = store.getState().store.dataSelect;
    if (listProducts) {
        let formData = new FormData();
        formData.append("bundle_id", id);
        formData.append("action", "createProducts");
        formData.append("products", JSON.stringify(listProducts));
        formData.append("shop", ShopDoamin);
        console.log(...formData);
        return (
            HTTP.post(`/admin/services.php`, formData)
        )
    }
}
const creatRules = (id) => {
    console.log(id);
}