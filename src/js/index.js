import riot from "riot";

import {
    DispatcherMixin
} from "./dispatcher.js";

import "./problem-root.riot.tag";

import styles from "../css/main.scss";

const DataMixin = {
    init: function() {},
    edx_state: {}
};


function getState() {
    // Returns the current state (which can be used for grading).
    return JSON.stringify(DataMixin.edx_state);
}

function setState() {
    const stateString = arguments.length === 1 ? arguments[0] : arguments[1];
    DataMixin.edx_state = JSON.parse(stateString);
    DispatcherMixin.dispatch("edx_state_updated", DataMixin.edx_state);
}

function getGrade() {
    return JSON.stringify(DataMixin.edx_state);
}

window.getGrade = getGrade;
window.getState = getState;
window.setState = setState;


// And boot the whole mess.

riot.mixin(DataMixin);
riot.mixin(DispatcherMixin);
riot.mount('problem-root');
