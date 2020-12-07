"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));

function CellContainer(props) {
    let count = props.count;
    let vh = window.innerHeight;
    let vw = window.innerWidth;

    if (count === 1) {
        if (vw <= 420) {
            return (React.createElement("div", { style: {
                width: '100%',
                maxWidth: `1245px`,
                height: '100vh',
                maxHeight: `${vh}px`,
                justifyContent: 'space-around'
            } }, props.content));
        } else {
            return (React.createElement("div", { style: {
                width: '100%',
                maxWidth: `1245px`,
                height: '100%',
                maxHeight: `${vh}px`,
                justifyContent: 'space-around'
            } }, props.content));
        }
    } else if (count === 2) {
        if (vw <= 420) {
            return (React.createElement("div", { style: {
                width: `${vw <= 420 ? 100 : 50}%`,
                maxWidth: '1245px',
                height: '50vh',
                maxHeight: `${vh / 2}px`,
                justifyContent: 'space-around'
            } }, props.content));
        } else {
            return (React.createElement("div", { style: {
                width: `${vw <= 420 ? 100 : 50}%`,
                maxWidth: '1245px',
                height: '100%',
                maxHeight: `${vh / 2}px`,
                justifyContent: 'space-around'
            } }, props.content));
        }
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
