import React from 'react';
import { Globalstyle } from './style';
import { GlobalIconStyle } from './statics/iconfont/iconfont';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './components/header';
import Home from './pages/home';
import Detail from './pages/detail/loadable';
import Login from './pages/login';
import Write from './pages/write';

function App() {
    return (
        <Provider store={store}>
            <Globalstyle />
            <GlobalIconStyle />
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={Home}></Route>
                <Route path="/detail/:id" exact component={Detail}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/write" exact component={Write}></Route>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
