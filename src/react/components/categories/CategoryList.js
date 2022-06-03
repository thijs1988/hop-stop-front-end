import React from "react";
import {Link} from "react-router-dom";
import {Spinner} from "../Spinner";

class CategoryList extends React.Component{
    render() {
        const {categories, menuTree} = this.props;

        if (categories === null || 0 === categories.length){
            return (<Spinner/>)
        }

        const CreateTree = ({data = []}) => {
            return (
                <ul className="sub-menu">
                    {data.map(tree => (
                        <TreeNode node={tree}/>
                    ))}
                </ul>
            )
        }

        const TreeNode = ({node}) => {
            const hasChild = node.children.length !== 0 ? true : false;
            return (
                <li>
                    <Link to={`/category/${node.data.id}/1`} key={node.data.id}>{node.data.name}</Link>

                    {
                        hasChild &&
                        <React.Fragment>
                            <CreateTree data={node.children}/>
                        </React.Fragment>
                    }
                </li>
            )
        }

        return (
            <li>
                <Link to="/cheers/:page?" key="unique">All CraftBeers
                    <i className="icon ion-md-arrow-dropdown"></i>
                </Link>
                <CreateTree data={menuTree}/>
            </li>
        );
    }
}

export default CategoryList;

