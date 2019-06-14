define([
    'react',
    'reactDom',
    'reactMenuComponent'
], function(React, ReactDOM, MenuComponent) {
    'use strict';

    return function(config, domElement) {
        var reactElement = React.createElement(MenuComponent.default, config);
        return ReactDOM.render(reactElement, domElement);
    };
});
