import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import { HomeWrapper, HomeLeft, HomeRight, BackTop } from './style';
import { actionCreators } from './store';

class Home extends PureComponent {
    handleScrollTop() {
        window.scrollTo(0, 0);
    }
    render() {
        const { showScroll } = this.props;
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img
                        className="banner-img"
                        src="//upload.jianshu.io/admin_banners/web_images/4732/5d0b947b56c13a3d5e96fe8fe77c66079deed975.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
                        alt=""
                    />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
                {showScroll ? (
                    <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop>
                ) : null}
            </HomeWrapper>
        );
    }
    componentDidMount() {
        this.props.changeHomeDate();
        this.bindEvents();
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.changeScrollTopShow);
    }
    bindEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow);
    }
}

const mapState = state => ({
    showScroll: state.getIn(['home', 'showScroll'])
});

const mapDispatch = dispatch => ({
    changeHomeDate() {
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow() {
        if (document.documentElement.scrollTop > 200) {
            dispatch(actionCreators.toggleTopShow(true));
        } else {
            dispatch(actionCreators.toggleTopShow(false));
        }
    }
});

export default connect(
    mapState,
    mapDispatch
)(Home);
