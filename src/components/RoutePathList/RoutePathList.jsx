import React from "react";
import { connect } from "react-redux";
import RoutePath from "$components/RoutePath/RoutePath.jsx";
import { getTagList } from "$src/reducers/reducers.js";

const RoutePathList = ({
    tags
}) => {
    return (
        <React.Fragment>
            {tags.map(t =>
                <RoutePath
                    key={t}
                    tag={t}
                    />)}
        </React.Fragment>        
    );
};


export default connect(state => ({
    tags: getTagList(state)
}))(RoutePathList);