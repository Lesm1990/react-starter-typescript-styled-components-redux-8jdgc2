import React, { Component } from "react";
import { connect } from 'react-redux';
import { render } from "react-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import { Row, AppState } from './types';

class Test extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };

    this.onChange = this.onChange.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickActivate = this.onClickActivate.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.PaginationCustom = this.PaginationCustom.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount(){
      this.props.dispatch({
        type: 'FETCH_LIST',
        response: { dispatch: (response) => {this.props.dispatch({
            type: 'LOAD_LIST',
            response
          })
        }}
      });
  }

  onChange(event){
    const {target: {name, value, type, checked}} = event;
    const _value = type === 'checkbox' ? checked : value;
    this.props.dispatch({
        type: 'SELECT_ROW',
        response: {checked, value}
    });
  };

  onChangeInput(event, row){
    const {target: {name, value, type}} = event;
    const {id} = row;
    const _value = type === 'select-one' ? (value == 1 ? true : false) : value;
    this.props.dispatch({
        type: 'EDIT_ROW',
        response: {id, name, value: _value}
    });
  };

  onClickDelete(){
    let {data} = this.props;
    data = data.filter((element) => {
      return !element.check;
    });
    this.props.dispatch({
        type: 'DELETE_ROW',
        response: { data }
      });
  };

  onClickActivate(index){
    this.props.dispatch({
        type: 'ACTIVATE_ROW',
        response: { id: index }
      });
  };

  onClickEdit(){
    const {edit} = this.state;
    const {data} = this.props;
    const total = data.filter((element) => { return element.check }).length;
    if(total > 0)
      this.setState({edit: !edit});
  };

  CheckColumn(params){
    const {check, onChange, value, edit} = params;
    return (<input type="checkbox" name="check" checked={check} onChange={(event) => {onChange(event)}} value={value} disabled={edit}/>);
  };

  NameColumn(params){
    const { name, edit, check, row, onChangeInput } = params;
    return (edit && check) ? (<input type="text" name="name" value={name} className={'form-control'} onChange={(event) => onChangeInput(event, row)}/>) : name;
  }

  StatusColumn(params){
    const { edit, status, check, row, onChangeInput } = params;
    return (edit && check) ? (<select name="status" className="form-control" onChange={(event) => onChangeInput(event, row)} defaultValue={status ? 1 : 0}>
                                <option key={`s-0`} value={1} selected={status}>Active</option>
                                <option key={`s-1`} value={0} selected={!status}>Inactive</option>
                              </select>) : (<Badge variant={status ? "success" : "danger"}>
                                              {status ? 'Active' : 'Inactive' }
                                            </Badge>);
  }
  
  DescriptionColumn(params){
    const { edit, label, check, row, onChangeInput } = params;
    return (edit && check) ? (<input type="text" name="label" value={label} className={'form-control'} onChange={(event) => onChangeInput(event, row)}/>) : label;
  }

  ActionColumn(params){
    const { edit, check, onClickActivate, index, status, onChangeInput } = params;
    return (<Button 
              variant={status ? 'outline-danger' : 'outline-success' } 
              onClick={() => onClickActivate(index)}
              disabled={(edit && check)}
              onChange={onChangeInput}
            >
              {status ? 'Deactivate' : 'Activate'}
            </Button>);
  }

  PaginationCustom() {
    const {onChangePage, props} = this;
    const {page, pages} = this.props;
    const total = pages - 1;
    return (<Pagination className="float-right">
                  <Pagination.Prev onClick={(e) => onChangePage({page: page - 1})} disabled={page===0}/>
                  {(page > 1 && pages > 3) && <Pagination.Ellipsis />}
                  {page > 0 && <Pagination.Item onClick={(e) => onChangePage({page: page - 1})}>{page}</Pagination.Item>}
                  <Pagination.Item active>{page + 1}</Pagination.Item>
                  {page < total && <Pagination.Item onClick={(e) => onChangePage({page: page + 1})}>{page + 2}</Pagination.Item>}
                  {page < (total-1) && <Pagination.Ellipsis />}
                  <Pagination.Next onClick={(e) => onChangePage({page: page + 1})} disabled={page===total}/>
                </Pagination>);
  }

  onChangePage(params) {
    const {page} = params;
    this.props.dispatch({
        type: 'CHANGE_PAGE',
        response: { page }
      });
  }

  render() {
    const {props, state, CheckColumn, onChange, onClickActivate, NameColumn, DescriptionColumn, ActionColumn, StatusColumn, onChangeInput, PaginationCustom} = this;
    const { list_view } = props;
    const {edit} = state;
    
    return (
        <div className="container mt-3">
          <h1 className="text-center">React Test</h1>
          <Table striped hover>
            <thead>
              <tr>
                <th scope="col"><input type="checkbox" name="select" disabled/></th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Estado</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                list_view.map(function(element, index){
                  const {id, check, name, status, label} = element;
                  return (<tr key={index}>
                            <th scope="row">
                              <CheckColumn 
                                key={index} 
                                check={check} 
                                onChange={(event) => { onChange(event) }} 
                                value={id}
                                edit={edit}
                              />
                            </th>
                            <td>
                              <NameColumn 
                                key={index} 
                                name={name} 
                                edit={edit} 
                                check={check}
                                row={element}
                                onChangeInput={(event, row) => { onChangeInput(event, row) }} 
                              />
                            </td>
                            <td>
                              <DescriptionColumn 
                                key={index} 
                                label={label} 
                                edit={edit} 
                                check={check}
                                row={element}
                                onChangeInput={(event, row) => { onChangeInput(event, row) }} 
                              />
                            </td>
                            <td>
                              <StatusColumn 
                                key={index}
                                status={status}
                                edit={edit}
                                check={check}
                                row={element}
                                onChangeInput={(event, row) => { onChangeInput(event, row) }} 
                              />
                            </td>
                            <td>
                              <ActionColumn 
                                index={element.id} 
                                edit={edit} 
                                check={check} 
                                onClickActivate={(index) => onClickActivate(index)} 
                                status={status}
                              />
                            </td>
                          </tr>)
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <Button variant="outline-danger" onClick={this.onClickDelete}>Delete</Button> {' '}
                  <Button variant="outline-primary" onClick={this.onClickEdit}>{edit ? 'Save': 'Edit'}</Button>
                </td>
                <td colSpan={2}>
                  <PaginationCustom />
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    list_view: state.list_view,
    edit: state.edit,
    page: state.page,
    pages: state.pages,
    tpage: state.tpage
  }
}

export default connect(mapStateToProps)(Test);
