// Это наша точка входа, место где собственно запускается js-код.

import riot from "riot";

// Диспетчер сообщений между тегами
// -- я писал его для Курситета в свое время и он отлично там
// работает.
import {
    DispatcherMixin
} from "./dispatcher.js";

// Наш корневой riot-тег.
import "./problem-root.riot.tag";

// Весь css естественно живет там.
import styles from "../css/main.scss";

// Это важная структура данных -- состояние задачи, присланное edx.
// Тегам оно будет доступно как this.edx_state, а также будет приходить
// в виде сигнала edx_state_updated.
const DataMixin = {
    init: function() {},
    edx_state: {}
};

// Это три функции через которые edx взаимодействует с нашим заданием -- подробнее
// см. документацию по Custom Javascript Problem.
// В простейшем случае они просто возвращают и принимают состояние переменной
// edx_state, свернув его в json. Они могут делать что-то более интересное, но этого
// достаточно.
function getState() {
    return JSON.stringify(DataMixin.edx_state);
}

function getGrade() {
    return JSON.stringify(DataMixin.edx_state);
}

function setState() {
    const stateString = arguments.length === 1 ? arguments[0] : arguments[1];
    DataMixin.edx_state = JSON.parse(stateString);
    // Получив состояние-задачи-из-edx, мы не только присваиваем его
    // соответствующей переменной, но и посылаем сигнал по диспетчеру что оно
    // изменилось, чтобы теги могли отреагировать.
    DispatcherMixin.dispatch("edx_state_updated", DataMixin.edx_state);
}

// Чтобы edx мог добраться до этих функций, мы вывешиваем их в корень iframe.
// Именно там их ищет edx.
window.getGrade = getGrade;
window.getState = getState;
window.setState = setState;

// И запускаем все это.
riot.mixin(DataMixin);
riot.mixin(DispatcherMixin);
riot.mount('problem-root');
