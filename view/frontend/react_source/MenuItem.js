import React from 'react';

class MenuItem extends React.Component {
    constructor() {
        super();
        this.state = {expanded: false};
    }

    onMouseOver() {
        this.setState({expanded: true});
    }

    onMouseLeave() {
        this.setState({expanded: false});
    }

    onMouseClick() {
        event.preventDefault();

        let isExpanded = this.state.expanded;
        if (isExpanded && this.hasChildren()) {
            return window.location.href = this.props.node.url;
        }

        if (!this.hasChildren()) {
            return window.location.href = this.props.node.url;
        }

        this.setState((state) => {return {expanded: !state.expanded}; });
    }

    getClassNames() {
        let node = this.props.node;
        let levelClass = 'level' + node.level;
        let classNames = [];

        classNames.push(levelClass);
        classNames.push(node.position_class);
        classNames.push(node.class);
        classNames.push('category-item');// @todo: Is this ever different?
        // @todo: Implement classname "first"
        classNames.push('ui-menu-item'); // @todo: Why is this needed?
        if (this.hasChildren()) classNames.push('parent');
        if (node.is_active) classNames.push('active');
        if (node.has_active) classNames.push('has-active');

        return classNames;
    }

    hasChildren() {
        return !!(this.props.node.children.length > 0);
    }

    render() {
        let classNames = this.getClassNames();
        let node = this.props.node;
        let levelClass = 'level' + node.level;
        let submenuStyle = {};
        if (this.state.expanded) {
            submenuStyle = {display: 'block'};
        }

        return (
            <li className={classNames.join(' ')} role="presentation" onMouseLeave={this.onMouseLeave.bind(this)} onMouseOver={this.onMouseOver.bind(this)}>
                <a href="#" onClick={this.onMouseClick.bind(this)} className="level-top ui-corner-all" aria-haspopup={this.hasChildren()} role="menuitem">
                    <span>{node.name}</span>
                </a>

                {node.children && node.children.length > 0 &&
                <ul className={levelClass + " submenu"} style={submenuStyle}>
                    {node.children.map((childNode) =>
                    <MenuItem node={childNode} key={childNode.id}/>
                    )}
                </ul>
                }
            </li>
        );
    }
}

export default MenuItem;