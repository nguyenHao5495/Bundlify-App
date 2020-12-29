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
        return (
            HTTP.post(`/admin/services.php?shop=${ShopDoamin}&action=saveSettings`, formData)
                .then(res => {
                    console.log(res.data);
                    if (res) {
                        creatProduct(res.data);
                        creatRules(res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        )
    },
    listBundle: (page) => {
        return (
            HTTP.get(`/admin/services.php?shop=${ShopDoamin}&action=getBundles&page=${page}`)
        )
    },
    listTotalBundle: () => {
        return (
            HTTP.get(`/admin/services.php?shop=${ShopDoamin}&action=getTotalBundle`)
        )
    },
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
    deleteBundle: (id) => {
        return (
            HTTP.get(`admin/services.php?shop=${ShopDoamin}&action=deleteBundle&id=${id}`)
        )
    },
    urlView: (id) => {
        return (
            HTTP.get(`admin/services.php?shop=${ShopDoamin}&action=getUrlViewBundle&bundle_id=${id}`)
        )
    },
    getorders: () => {
        return (
            HTTP.get(`admin/services.php?shop=${ShopDoamin}&action=getOrders`)
        )
    }

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
        return (
            HTTP.post(`/admin/services.php`, formData)
        )
    }
}
const creatRules = (id) => {

    const listRules = store.getState().store2.dataTable;
    console.log(listRules);
    if (listRules) {
        let formData = new FormData();
        formData.append("bundle_id", id);
        formData.append("action", "createRules");
        formData.append("rules", JSON.stringify(listRules));
        formData.append("shop", ShopDoamin);
        return (
            HTTP.post(`/admin/services.php`, formData)
        )
    }
}