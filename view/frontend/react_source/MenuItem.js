import React, { useState } from 'react';

const getClassNames = (node) => {
    let levelClass = 'level' + (node.level - 2);
    let classNames = [];

    classNames.push(levelClass);
    classNames.push(node.position_class);
    //classNames.push(node.class); // @todo: Removed when migrating to GraphQL
    classNames.push('category-item');// @todo: Is this ever different?
    // @todo: Implement classname "first"
    classNames.push('ui-menu-item'); // @todo: Why is this needed?
    if (hasChildren(node)) classNames.push('parent');
    if (node.is_active) classNames.push('active');
    if (node.has_active) classNames.push('has-active');

    return classNames;
};

const hasChildren = (node) => {
    if (!node.children) return false;
    return (node.children.length > 0);
};

const MenuItem = (props) => {
    let freeze = false;
    const [expanded, setExpanded] = useState(false);
    const node = props.node;

    const onMouseEnter = () => {
        event.preventDefault();
        freeze = true;
        setExpanded(true);
    };

    const onMouseLeave = () => {
        setExpanded(false);
    };

    const onMouseClick = (event) => {
        event.preventDefault();

        if (freeze) {
            return;
        }

        if (expanded && hasChildren(node)) {
            return window.location.href = node.url;
        }

        if (!hasChildren(node)) {
            return window.location.href = node.url;
        }

        setExpanded(!expanded);
    };

    let classNames = getClassNames(node);
    let levelClass = 'level' + node.level;
    let submenuStyle = (expanded) ? {display: 'block'} : {};

    return (
        <li className={classNames.join(' ')} role="presentation" onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} onClick={onMouseClick}>
            <a href="#" className="level-top ui-corner-all" aria-haspopup={hasChildren(node)} role="menuitem">
                <span>{node.name}</span>
            </a>

            {hasChildren(node) &&
            <ul className={levelClass + " submenu"} style={submenuStyle}>
                {node.children.map((childNode) =>
                    <MenuItem node={childNode} key={childNode.id}/>
                )}
            </ul>
            }
        </li>
    );
};

export default MenuItem;