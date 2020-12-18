import React, { useState, useCallback } from 'react';
import { Button, Toast } from '@shopify/polaris';
import store from '../store'
const CreateData = () => {
    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const toastMarkup = active ? (
        <Toast content="Select at least one product and up" error onDismiss={toggleActive} />
    ) : null;
    return (
        <div style={{ height: '50px' }}>
            {store.getState().dataSelect.length < 1 &&
                <Button primary onClick={toggleActive}>Create</Button>
            }

            {store.getState().dataSelect.length > 0 &&
                <Button primary>Create</Button>
            }
            {toastMarkup}

        </div>
    );
}

export default CreateData;
