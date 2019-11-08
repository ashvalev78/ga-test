import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/Admin/actions';
import * as Styles from './Admin';

const Row = (props) => {
    // console.log(props);
    return (
        <Styles.Row>
            <Styles.Column>
                <input type='checkbox' checked={props.selected} onChange={(e) => {
                    if (e.currentTarget.checked) {
                        props.addSelected(props.id);
                    } else {
                        props.removeSelected(props.id);
                    }
                }}/> 
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="number" value={props.number} onChange={(e) => {props.changeNumber(Number(e.currentTarget.value), props.id);}}/>
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" value={props.name} onChange={(e) => {props.changeName(e.currentTarget.value, props.id);}}/>
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" value={props.date} onChange={(e) => {props.changeDate(e.currentTarget.value, props.id);}}/>
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" value={props.status} 
                    onChange={(e) => {
                        props.changeStatus(e.currentTarget.value, props.id);
                        props.changeStatuses(e.currentTarget.value);
                    }}/>
            </Styles.Column>
        </Styles.Row>
    );
};

const MainRow = (props) => {
    return (
        <Styles.Row>
            <Styles.Column>
                <input type='checkbox' 
                onChange={(e) => {
                    props.selectAll(e.currentTarget.checked);
                }}/> 
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" defaultValue='number' readOnly
                    onClick={() => {
                        props.sortBy('number');
                    }}
                />
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" defaultValue='name' readOnly
                    onClick={() => {
                        props.sortBy('name');
                    }}/>
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" defaultValue='date' readOnly
                    onClick={() => {
                        props.sortBy('date');
                    }}/>
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" defaultValue='status' readOnly                    
                    onClick={() => {
                        props.sortBy('status');
                    }}/>
            </Styles.Column>
        </Styles.Row>
    );
};

const AddRow = (props) => {
    let number = '', name = '', date = '', status='';
    return (
        <Styles.Row>
            <Styles.Column>
                <input type='button' value='Add row'
                    onClick={() => {
                        if (number) {
                            props.addItem(
                                {
                                    number,
                                    name,
                                    date,
                                    status
                                }
                            );
                        }
                    }}
                /> 
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" placeholder='number'
                onChange={(e) => {
                    number = Number(e.currentTarget.value);
                }}/>
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" placeholder='name'
                onChange={(e) => {
                    name = e.currentTarget.value;
                }}/>
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" placeholder='date'
                onChange={(e) => {
                    date = e.currentTarget.value;
                }}/>
            </Styles.Column>
            <Styles.Column>
                <Styles.Input type="text" placeholder='status'
                onChange={(e) => {
                    status = e.currentTarget.value;
                }}/>
            </Styles.Column>
        </Styles.Row>
    );
}

class Admin extends Component {
    constructor(props) {
        super(props);

        // sortType asc - true, desc - false

        this.state = {
            sortBy: 'number',
            sortType: true,
        }
    }

    // unified sort function
    sortFunction = (a, b) => {
        if (a[this.state.sortBy] <= b[this.state.sortBy])
            return -1;
        else return 1;
    }

    // to select all of the elements to change statuses 
    selectAll = (checked) => {
        let table = this.props.table.slice(0);
        if (checked)
            table.forEach(item => {
                this.props.addSelected(item.id);
            });
        else 
            table.forEach(item => {
                this.props.removeSelected(item.id);
            });
    }

    render() {
        // primitive auth check
        if (!this.props.authorized) {
            return (<Redirect to='/'></Redirect>);
        }
        let table = this.props.table.slice(0);

        // table sort (asc/desc)
        table.sort(this.sortFunction);
        if (!this.state.sortType) {
            table.reverse();
        }
        return (
            <Styles.Container>
                <button onClick={() => {
                    this.props.exit();
                }}>{'exit'}</button>
                <Styles.Table>
                    <MainRow 
                    sortBy={(sort) => {
                        this.setState({sortBy: sort, sortType: !this.state.sortType});
                    }}
                    selectAll={this.selectAll}
                    >
                    </MainRow>

                    {table.map((item) => {
                        return (
                            <Row {...item} key={item.id} 
                            changeNumber={this.props.changeNumber}
                            changeName={this.props.changeName}
                            changeDate={this.props.changeDate}
                            changeStatus={this.props.changeStatus}
                            addSelected={this.props.addSelected}
                            removeSelected={this.props.removeSelected}
                            changeStatuses={this.props.changeMultipleStatuses}
                            ></Row>
                        );
                    })}

                    <AddRow addItem={this.props.addItem}></AddRow>
                </Styles.Table>

            </Styles.Container>
        );
    }
};

export default connect(
    state => ({
        testStore: state,
        table: state.admin.table,
        authorized: state.authorization.authorized
    }),
    dispatch => ({
        changeNumber: (number, index) => {
            dispatch({
                type: actions.CHANGE_NUMBER,
                payload: {
                    index,
                    number
                }
            });
        },
        changeName: (name, index) => {
            dispatch({
                type: actions.CHANGE_NAME,
                payload: {
                    index,
                    name
                }
            });
        },
        changeDate: (date, index) => {
            dispatch({
                type: actions.CHANGE_DATE,
                payload: {
                    index,
                    date
                }
            });
        },
        changeStatus: (status, index) => {
            dispatch({
                type: actions.CHANGE_STATUS,
                payload: {
                    index,
                    status
                }
            });
        },
        changeMultipleStatuses: (status) => {
            dispatch({
                type: actions.CHANGE_MULTIPLE_STATUSES,
                payload: {
                    status
                }
            });
        },
        addSelected: (id) => {
            dispatch({
                type: actions.ADD_SELECTED,
                payload: {
                    id
                }
            });
        },
        removeSelected: (id) => {
            dispatch({
                type: actions.REMOVE_SELECTED,
                payload: {
                    id
                }
            });
        },
        addItem: (item) => {
            dispatch({
                type: actions.ADD_ITEM,
                payload: {
                    item
                }
            })
        },
        exit: () => {
            dispatch({
                type: actions.EXIT,
                payload: {
                    authorized: false
                }
            })
        }
    })
)(Admin);