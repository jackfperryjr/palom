"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));

// const PREDEFINED_LAYOUTS = new Map([
//     [1, ['"x0"', 1, 1]],
//     [2, ['"x0 x1"', 1, 2]],
//     [3, ['"x0 x1" "x2 x3"', 2, 2]]
// ]);


// function getGridTemplateAreas(numberOfItems) {
//     if (PREDEFINED_LAYOUTS.has(numberOfItems)) {
//         return PREDEFINED_LAYOUTS.get(numberOfItems)[0];
//     }
//     const columns = getGridTemplateColumns(numberOfItems);
//     const rows = getGridTemplateRows(numberOfItems);
//     const gridTemplateRows = [];
//     for (let i = 0; i < rows; i++) {
//         const row = [];
//         for (let j = 0; j < columns; j++) {
//             row.push('x' + (i * columns + j).toString(16));
//         }
//         gridTemplateRows.push(`"${row.join(' ')}"`);
//     }
//     return gridTemplateRows.join(' ');
// }


// function getGridTemplateColumns(numberOfItems) {
//     if (PREDEFINED_LAYOUTS.has(numberOfItems)) {
//         return PREDEFINED_LAYOUTS.get(numberOfItems)[2];
//     }
//     return Math.ceil(Math.pow(numberOfItems, 0.5));
// }


// function getGridTemplateRows(numberOfItems) {
//     if (PREDEFINED_LAYOUTS.has(numberOfItems)) {
//         return PREDEFINED_LAYOUTS.get(numberOfItems)[1];
//     }
//     return Math.ceil(numberOfItems / Math.ceil(Math.pow(numberOfItems, 0.5)));
// }


// function getGridArea(index) {
//     return 'x' + index.toString(16);
// }


function CellContainer(props) {
    let count = props.count;
    let vh = window.innerHeight;
    let vw = window.innerWidth;

    if (count === 1) {
        return (React.createElement("div", { style: {
            width: '100%',
            maxWidth: `1245px`,
            height: '100%',
            maxHeight: `${vh}px`,
            justifyContent: 'space-around'
        } }, props.content));
    } else if (count === 2) {
        return (React.createElement("div", { style: {
            width: `${vw <= 420 ? 100 : 50}%`,
            maxWidth: '1245px',
            height: '100%',
            maxHeight: `${vh / 2}px`,
            justifyContent: 'space-around'
        } }, props.content));
    } else if (count > 2 && count < 5) {
        return (React.createElement("div", { style: {
            width: `${vw <= 420 ? 100 : 50}%`,
            maxWidth: '622.5px',
            height: '50%',
            maxHeight: `${vh / 2}px`,
            justifyContent: 'space-around'
        } }, props.content));
    } else {
        return (React.createElement("div", { style: {
            width: `${vw <= 420 ? 50 : 33.3}%`,
            maxWidth: '444.25px',
            height: '50%',
            maxHeight: `${vh / 2}px`,
            justifyContent: 'space-around'
        } }, props.content));
    }
}

function FlexContainer(props) {
    let viewport = window.innerWidth;

    if (viewport <= 420) {
        return (React.createElement("div", { id: props.id, className: props.className, style: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
            minWidth: '100%',
            width: '100%',
            overflow: 'hidden'
        } }, props.content));
    } else {
        return (React.createElement("div", { id: props.id, className: props.className, style: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
            minWidth: '100%',
            overflow: 'hidden'
        } }, props.content));
    }
}
/**
 * @description
 *
 * @public
 *
 */
class FlexLayout extends React.Component {
    render() {
        const items = this.props.items;
        const rendered = [];
        let index = 0;
        for (const item of items) {
            const renderedItem = this.props.renderCell(item);
            if (renderedItem) {
                rendered.push(React.createElement(CellContainer, { count: items.length, index: index, key: index, content: renderedItem }));
                index += 1;
            }
        }
        return (React.createElement(FlexContainer, { id: this.props.id, className: this.props.className, itemCount: rendered.length, content: rendered }));
    }
}
exports.default = FlexLayout;
