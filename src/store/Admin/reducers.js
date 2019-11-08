import * as actions from './actions';

// Идея: есть неизменная таблица в redux-е, все изменения и прочее записываются в нее, не меняя расположения элементов
// Сортировки и прочее применяются только к локальным таблицам в самих компонентах

let table = [];

const statuses = [
    'pending',
    'done',
    'error'
];

for (let i = 0; i < Math.floor(Math.random() * Math.floor(50)); i++) {
    table[i] = {
        number: i,
        name: Math.random().toString(36).substring(10),
        date: new Date(),
        status: statuses[Math.floor(Math.random() * Math.floor(3))],
        id: i,
        selected: false
    };
}

const defaultState = {
    table,
    selectedRows: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.CHANGE_NUMBER: {
            let table = state.table.slice(0);
            table[action.payload.index].number = action.payload.number;
            return {
                ...state,
                table
            };
        }
        case actions.CHANGE_NAME: {
            let table = state.table.slice(0);
            table[action.payload.index].name = action.payload.name;
            return {
                ...state,
                table
            };
        }
        case actions.CHANGE_DATE: {
            let table = state.table.slice(0);
            table[action.payload.index].date = action.payload.date;
            return {
                ...state,
                table
            };
        }
        case actions.CHANGE_STATUS: {
            let table = state.table.slice(0);
            table[action.payload.index].status = action.payload.status;
            return {
                ...state,
                table
            };
        }
        case actions.CHANGE_MULTIPLE_STATUSES: {
            let table = state.table.slice(0);
            state.selectedRows.forEach(item => {
                table[item].status = action.payload.status;
            });
            return {
                ...state,
                table
            };
        }
        case actions.ADD_SELECTED: {
            let selectedRows = state.selectedRows.slice(0);
            let table = state.table.slice(0);
            table[action.payload.id].selected = true;
            selectedRows.push(action.payload.id);
            return {
                ...state,
                selectedRows,
                table
            };
        }
        case actions.REMOVE_SELECTED: {
            let selectedRows = state.selectedRows.slice(0);
            let table = state.table.slice(0);
            table[action.payload.id].selected = false;
            // check that all of the copies of element deleted
            while (selectedRows.indexOf(action.payload.id) !== -1)
                selectedRows.splice(selectedRows.indexOf(action.payload.id), 1);
            return {
                ...state,
                selectedRows,
                table
            };
        }
        case actions.ADD_ITEM: {
            let table = state.table.slice(0);
            let item = {};
            Object.assign(item, action.payload.item);
            // id нового элемента назначается, исходя из размера таблицы элементов. в целом, это некорректно, но так как нет
            // функции удаления элемента из таблицы, такой "костыль" имеет право на временное существование
            // p.s. простите за кровь из глаз, голова не варит
            item.id = state.table.length;
            item.selected = false;
            table.push(item);
            return {
                ...state,
                table
            };
        }
        default: return state;
    }
};