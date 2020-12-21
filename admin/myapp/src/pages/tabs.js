import React, { useCallback, useState } from 'react';
import { Tabs, Icon } from '@shopify/polaris';
import Order from '../pages/AllOrder';
import Bundle from '../pages/Bundle';
import Settings from '../pages/settings';
import {
    CheckoutMajor,
    SettingsMajor,
    NoteMajor,
    DuplicateMinor
} from '@shopify/polaris-icons';

export default function TabsExample() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            setSelected(selectedTabIndex)
        },
        [],
    );
    const changeSelected = () => {
        setSelected(1)
    }
    const tabs = [
        {
            id: 'Order',
            content: (
                <div className="title_tabs">
                    <Icon source={CheckoutMajor} />
                    <span>
                        Orders
                    </span>
                </div>
            ),
            data: (
                <Order changeSelected={changeSelected} />
            ),
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content',

        },
        {
            id: 'Bundle',
            content: (
                <div className="title_tabs">
                    <Icon source={DuplicateMinor} />
                    <span>
                        Bundle
                    </span>
                </div>

            ),
            data: (
                <Bundle />
            ),
            panelID: 'accepts-marketing-content',
        },
        {
            id: 'Settings',
            content: (
                <div className="title_tabs">
                    <Icon source={SettingsMajor} />
                    <span>
                        Settings
                    </span>
                </div>

            ),
            data: (
                <Settings />
            ),
            panelID: 'repeat-customers-content',
        },
        {
            id: 'Document',
            content: (
                <div className="title_tabs">
                    <Icon source={NoteMajor} />
                    <span>
                        Document
                    </span>
                </div>
            ),
            data: (
                3
            ),
            panelID: 'prospects-content',
        },
    ];

    return (
        <div>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <div>
                    {tabs[selected].data}
                </div>
            </Tabs>
        </div>



    );
}