import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Styles from './Authorization';
import * as actions from '../../store/Authorization/actions';



const Input = (props) => {
    return (
        <Styles.StyledInput type={props.type} {...props}></Styles.StyledInput>
    )
}


class Authorization extends Component {
    render() {
        if (this.props.authorized) {
            return <Redirect to='/admin'></Redirect>
        }
        return (
            <Styles.Container>
                <Styles.Text>{'Login'}</Styles.Text>
                <Input type='text' 
                    onChange={(e) => {this.props.getLogin(e.currentTarget.value);}}>
                </Input>
                <Styles.Text>{'Password'}</Styles.Text>
                <Input type='password' 
                    onChange={(e) => {this.props.getPassword(e.currentTarget.value);}}>
                </Input>
                <Styles.Button 
                    onClick={() => {
                        if (this.props.login === 'admin' && this.props.password === 'admin') {   
                            this.props.authorize(true);
                        }
                    }}>
                    {'Войти'}
                </Styles.Button>
            </Styles.Container>
        );
    }
};

export default connect(
    state => ({
        testStore: state,
        login: state.authorization.login,
        password: state.authorization.password,
        authorized: state.authorization.authorized
    }),
    dispatch => ({
        getLogin: (login) => {
            dispatch({
                type: actions.GET_LOGIN,
                payload: {
                    login
                }
            })
        },
        getPassword: (password) => {
            dispatch({
                type: actions.GET_PASSWORD,
                payload: {
                    password
                }
            })
        },
        authorize: (authorized) => {
            dispatch({
                type: actions.AUTHORIZE,
                payload: {
                    authorized
                }
            })
        }
    })
)(Authorization);