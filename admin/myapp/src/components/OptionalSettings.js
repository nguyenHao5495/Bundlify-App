import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { Space, DatePicker } from 'antd';
import { Checkbox, TextField } from '@shopify/polaris';

const OptionalSettings = () => {
    const [startTime, setStartTime] = useState(false);
    const [endTime, setEndTime] = useState(false);
    const [valuetime, setValuetime] = useState("");
    const [valuetimeEnd, setValuetimeEnd] = useState("");
    const [checkShowTag, setcheckShowTag] = useState(false);
    const [checktag, setCheckTag] = useState(false);
    const [dataTag, setDataTag] = useState('');



    //----------------Funtion methord---------//
    const handleDataTag = useCallback((value) => {
        setDataTag(value)
        console.log(value);
    }, []);
    const checkStartTime = useCallback((newChecked) => {
        setStartTime(newChecked)
    }, []);
    const checkEndTime = useCallback((newChecked) => {
        setEndTime(newChecked)
    }, []);
    const checkShowTagInput = useCallback((value) => {
        setcheckShowTag(value)
    }, []);
    const valueTag = useCallback((value) => {
        setCheckTag(value)
    }, []);
    useEffect(() => {
        setValuetime(new Date())
    }, [startTime]);
    useEffect(() => {
        setValuetimeEnd(new Date())
    }, [endTime]);
    const valueTime = useCallback((value, dateString) => {
        if (value) {
            console.log(dateString, value._d);
            setValuetime(dateString)
        }
    }, [])
    const valueTimeEnd = useCallback((value, dateString) => {
        if (value) {
            console.log(dateString, value._d);
            setValuetimeEnd(dateString)
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
