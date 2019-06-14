import React from 'react';
import MenuItem from './MenuItem';

class Menu extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.data.children.map((node) =>
                    <MenuItem node={node} key={node.id}/>
                )}
            </React.Fragment>
        );
    }
}

export default Menu;