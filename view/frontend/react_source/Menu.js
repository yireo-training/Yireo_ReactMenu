import React from 'react';
import MenuItem from './MenuItem';

const Menu = (props) => {
    if (!props.children) {
        return <React.Fragment>No data found</React.Fragment>;
    }

    return (
        <React.Fragment>
            {props.children.map((node) =>
                <MenuItem node={node} key={node.id}/>
            )}
        </React.Fragment>
    );
};

export default Menu;