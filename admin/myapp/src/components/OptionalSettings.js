import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { Space, DatePicker } from 'antd';
import { Checkbox, TextField } from '@shopify/polaris';
import store from '../store/index';


const OptionalSettings = () => {
    const [startTime, setStartTime] = useState(false);
    const [endTime, setEndTime] = useState(false);
    const [valuetime, setValuetime] = useState(new Date());
    const [valuetimeEnd, setValuetimeEnd] = useState(new Date());
    const [checkShowTag, setcheckShowTag] = useState(false);
    const [checktag, setCheckTag] = useState(false);
    const [dataTag, setDataTag] = useState('');


    useEffect(() => {
        let time_end = null;
        if (endTime === true) {
            time_end = valuetimeEnd
        }
        store.dispatch({
            type: "DATA_TIME",
            time: {
                enable_start_date: startTime,
                start_date: valuetime,
                enable_end_date: endTime,
                end_date: time_end,
                require_logged_in: checkShowTag,
                enable_customer_tags: checktag,
                customer_tags: dataTag

            }
        })
    }, [startTime, endTime, checkShowTag, checktag, valuetimeEnd, valuetime, dataTag]);
    //----------------Funtion methord---------//
    const handleDataTag = useCallback((value) => {
        setDataTag(value)
    }, []);
    const checkStartTime = useCallback((newChecked) => {
        setStartTime(newChecked);
    }, []);
    const checkEndTime = useCallback((newChecked) => {
        setEndTime(newChecked)
    }, []);
    const checkShowTagInput = useCallback((value) => {
        setcheckShowTag(value);

    }, []);
    const valueTag = useCallback((value) => {
        setCheckTag(value)

    }, []);
    const valueTime = useCallback((value, dateString) => {
        if (value) {
            setValuetime(dateString);
        }
    }, [])
    const valueTimeEnd = useCallback((value, dateString) => {
        if (value) {
            setValuetimeEnd(dateString);

        }
    }, [])
    return (
        <div>
            <div className="checkTime">
                <Checkbox
                    label="Set start time for this offer"

                    checked={startTime}
                    onChange={checkStartTime}
                />
            </div>

            <div className="DateTime">
                {startTime === true &&

                    <Space direction="center">

                        <DatePicker
                            defaultValue={moment(valuetime)}
                            showTime={{ format: 'HH:mm' }}
                            onChange={valueTime} />
                    </Space>
                }
            </div>
            <div className="checkTime">
                <Checkbox
                    label="Set end time for this offer"
                    checked={endTime}
                    onChange={checkEndTime}
                />
            </div>

            <div className="DateTime">
                {endTime === true &&
                    <Space direction="center">
                        <DatePicker
                            defaultValue={moment(valuetimeEnd)}
                            showTime={{ format: 'HH:mm' }}
                            onChange={valueTimeEnd}
                        />
                    </Space>
                }
            </div>
            <div className="checkOfferCus checkTime">
                <Checkbox
                    label="Show offer for logged in customer"
                    checked={checkShowTag}
                    onChange={checkShowTagInput}
                />
            </div>
            {checkShowTag === true &&
                <div className="checkTag checkTime">
                    <Checkbox
                        label="With tags"
                        checked={checktag}
                        onChange={valueTag}
                    />
                </div>
            }
            {checktag === true &&
                <TextField
                    value={dataTag}
                    onChange={handleDataTag}
                    helpText={
                        <span>
                            Separate by ","
                    </span>
                    }
                />
            }
        </div>
    );
}

export default OptionalSettings;
