import React from 'react';
import { Globalstyle } from './style';
import { GlobalIconStyle } from './statics/iconfont/iconfont';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './components/header';

function App() {
    return (
        <Provider store={store}>
            <Globalstyle />
            <GlobalIconStyle />
            <Header />
            <BrowserRouter>
                <Route path="/" exact render={()=><div>home</div>}></Route>
                <Route path="/detail" exact render={()=><div>detail</div>}></Route>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
