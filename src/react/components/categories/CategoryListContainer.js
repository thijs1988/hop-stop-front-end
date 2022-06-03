import React from "react";
import {categoryListFetch} from "../../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Spinner";
import CategoryList from "./CategoryList";
import Tree from "../Tree";

const mapStateToProps = state => ({
    ...state.categoryList
});

const mapDispatchToProps = {
    categoryListFetch
}

class CategoryListContainer extends React.Component {
    componentDidMount(){
        this.props.categoryListFetch();
    }

    formTree(categories){
        if(!categories){
            return
        }
        let tree = new Tree();
        return tree.menuTree(categories);
    }


    render() {
        const {isFetching, categories} = this.props;
        const menuTree = this.formTree(categories);

        if (isFetching) {
            return(<Spinner/>);
        }

        return (
            <CategoryList categories={categories} menuTree={menuTree} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);