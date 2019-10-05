import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button
} from './style';

class Header extends Component {
    getListArea = () => {
        const {
            focused,
            list,
            page,
            totalPage,
            handleMouseEnter,
            handleMouseLeave,
            mouseIn,
            handleChangePage
        } = this.props;
        const pageList = [];
        // list[i]  list 是immutable的数组  不支持[i]的形式
        const newList = list.toJS();
        if (newList.length) {
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>
                        {newList[i]}
                    </SearchInfoItem>
                );
            }
        }
        if (focused || mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch
                            onClick={() =>
                                handleChangePage(page, totalPage, this.spinIcon)
                            }
                        >
                            <i
                                ref={icon => (this.spinIcon = icon)}
                                className="iconfont spin"
                            >
                                &#xe851;
                            </i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>{pageList}</SearchInfoList>
                </SearchInfo>
            );
        } else {
            return null;
        }
    };
    render() {
        const { focused, handleInputFocus, handleInputBlur, list } = this.props;
        return (
            <HeaderWrapper>
                <Link to="/">
                    <Logo />
                </Link>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载App</NavItem>
                    <NavItem className="right">登陆</NavItem>
                    <NavItem className="right">
                        <i className="iconfont">&#xe601;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={() => handleInputFocus(list)}
                                onBlur={handleInputBlur}
                            ></NavSearch>
                        </CSSTransition>
                        <i
                            className={
                                focused
                                    ? 'focused iconfont zoom'
                                    : 'iconfont zoom'
                            }
                        >
                            &#xe611;
                        </i>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className="writting">
                        <i className="iconfont">&#xe66f;</i>
                        写文章
                    </Button>
                    <Button className="reg">注册</Button>
                </Addition>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        // state.get('header').get('focused')
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn'])
    };
};

const mapDispathToprops = dispath => {
    return {
        handleInputFocus(list) {
            list.size === 0 && dispath(actionCreators.getList());
            // if(list.size === 0){
            //     dispath(actionCreators.getList());
            // }
            dispath(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispath(actionCreators.searchBlur());
        },
        handleMouseEnter() {
            dispath(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            dispath(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage, spin) {
            // 旋转动画
            let originAngle = spin.style.transform.replace(/[^0-9]/gi, '');
            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            } else {
                originAngle = 0;
            }
            spin.style.transform = `rotate(${originAngle + 360}deg)`;

            // 判断当前页是否小于总页数
            if (page < totalPage) {
                dispath(actionCreators.changePage(page + 1));
            } else {
                dispath(actionCreators.changePage(1));
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispathToprops
)(Header);
