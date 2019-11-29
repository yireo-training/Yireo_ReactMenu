import React, {useState, useEffect} from 'react';
import MenuItem from './MenuItem';

const Menu = (props) => {
    const [nodes, setNodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const originalContent = {__html: props.originalContent};

    const variables = {rootId: 2};
    const query = `query rootCategories($rootId: Int) {
  category(id: $rootId) {
    children {
      id
      url: url_path
      name
      level
      position
      children {
        id
        url: url_path
        name
        level
        position
      }
    }
  }
}
    `;

    useEffect(() => {
        fetch('/graphql', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                setLoading(false);
                return response;
            })
            .then(response => response.json())
            .then(responseJson =>
                setNodes(responseJson.data.category.children)
            )
            .catch(error => setError(error));
    }, []);

    if (loading) {
        return <React.Fragment><div dangerouslySetInnerHTML={originalContent}/></React.Fragment>;
    }

    if (!nodes) {
        return <React.Fragment><div dangerouslySetInnerHTML={originalContent}/></React.Fragment>;
    }

    nodes.sort((a, b) => (a.position > b.position) ? 1 : -1);

    return (
        <React.Fragment>
            {nodes.map((node) =>
                <MenuItem node={node} key={node.id}/>
            )}
        </React.Fragment>
    );
};

export default Menu;