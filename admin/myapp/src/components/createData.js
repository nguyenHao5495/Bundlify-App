import React, { useState, useCallback } from 'react';
import { Button, Toast } from '@shopify/polaris';
import store from '../store';
import Api from '../apis/RestFullApi';
const CreateData = (dataBuldle) => {
    const [active, setActive] = useState(false);
    const postData = () => {
        const data = Api.createBundle(dataBuldle.dataBuldle);
        data.then(res => {
            console.log(res.data);
            if (res.data) {
                dataBuldle.seclect()
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const toastMarkup = active ? (
        <Toast content="Select at least one product and up" error onDismiss={toggleActive} />
    ) : null;
    return (
        <div style={{ height: '50px' }}>
            {store.getState().store.dataSelect.length < 1 &&
                <Button primary onClick={toggleActive}>Create</Button>
            }

            { store.getState().store.dataSelect.length > 0 &&
                <Button primary onClick={postData}>Create</Button>
            }
            {toastMarkup}

        </div>
    );
}

export default CreateData;
