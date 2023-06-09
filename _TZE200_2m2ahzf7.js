 const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    // Since a lot of TuYa devices use the same modelID, but use different datapoints
    // it's necessary to provide a fingerprint instead of a zigbeeModel
    fingerprint: [
        {

            modelID: 'TS0601',
            manufacturerName: '_TZE200_2m2ahzf7',
        },
    ],
    model: 'TS0601_new',
    vendor: 'tuya',
    description: 'tuya-8key',
    fromZigbee: [tuya.fz.datapoints,fz.tuya_on_off_action],
    toZigbee: [tuya.tz.datapoints],
    configure: tuya.configureMagicPacket,
    exposes: [
    	    tuya.exposes.switch().withEndpoint('l1'),
            tuya.exposes.switch().withEndpoint('l2'),
            tuya.exposes.switch().withEndpoint('l3'),
            tuya.exposes.switch().withEndpoint('l4'),
            e.action(['scene_1', 'scene_2', 'scene_3', 'scene_4'])
    ],
        endpoint: (device) => {
            return {'l1': 1, 'l2': 1, 'l3': 1, 'l4': 1, 'l5': 1, 'l6': 1, 'l7': 1, 'l8': 1};
        },
    meta: {
        // All datapoints go in here
        multiEndpoint: true,
        tuyaDatapoints: [
                [1, 'state_l1', tuya.valueConverter.onOff],
                [2, 'state_l2', tuya.valueConverter.onOff],
                [3, 'state_l3', tuya.valueConverter.onOff],
                [4, 'state_l4', tuya.valueConverter.onOff], 
                [0x67, 'action', tuya.valueConverterBasic.lookup({'scene_3': 0})],
                [0x68, 'action', tuya.valueConverterBasic.lookup({'scene_4': 0})],
                [0x65, 'action', tuya.valueConverterBasic.lookup({'scene_1': 0})],
                [0x66, 'action', tuya.valueConverterBasic.lookup({'scene_2': 0})]
        ],
    },
        whiteLabel: [
            tuya.whitelabel('Zimai', 'TS0601_key_8', '8 key switch', ['_TZE200_2m2ahzf7']),
        ]
};

module.exports = definition;



