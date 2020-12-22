import { HTTP } from "../httpService/http-common";
import { ShopDoamin } from "../httpService/http-common";

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
        return (
            HTTP.post(`/admin/services.php?shop=${ShopDoamin}&action=saveSettings`, formData)
        )
    },
    listBundle: () => HTTP.get(`/admin/services.php?shop=${ShopDoamin}&action=getBundles&page=1`),
}