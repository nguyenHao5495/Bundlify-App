import { HTTP } from "../httpService/http-common";
import { ShopDoamin } from "../httpService/http-common";
console.log(ShopDoamin);
export default {
    listProduct: () => HTTP.get(`/admin/services.php?shop=${ShopDoamin}&action=getProducts&since_id=1&limit=50`),
    listSettings: () => HTTP.get(`/admin/services.php?shop=${ShopDoamin}&action=getSettings`),
    updateSettings: (settings) => {
        HTTP.post(`/admin/services.php?shop=${ShopDoamin}&action=saveSettings`,
            {
                settings: settings
            }
        )
            .then(res => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }
}