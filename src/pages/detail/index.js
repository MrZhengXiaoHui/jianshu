import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// 用于异步加载获取不到this.props
import {withRouter} from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';

class Detail extends PureComponent {
    render() {
        const { title, content } = this.props;
        return (
            <DetailWrapper>
                <Header>{title}</Header>
                <Content dangerouslySetInnerHTML={{ __html: content }} />
            </DetailWrapper>
        );
    }
    componentDidMount() {
        this.props.getDetail(this.props.match.params.id);
    }
}

const mapState = state => ({
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
});

const mapDispatch = dispatch => ({
    getDetail(id) {
        dispatch(actionCreators.getDetail(id));
    }
});

export default connect(
    mapState,
    mapDispatch
)(withRouter(Detail));
