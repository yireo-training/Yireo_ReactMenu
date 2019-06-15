import React from 'react';
import MenuItem from './MenuItem';

class Menu extends React.Component {
    render() {
        if (!this.props.children) {
            return <React.Fragment>No data found</React.Fragment>;
        }

        return (
            <React.Fragment>
                {this.props.children.map((node) =>
                    <MenuItem node={node} key={node.id}/>
                )}
            </React.Fragment>
        );
    }
}

export default Menu;