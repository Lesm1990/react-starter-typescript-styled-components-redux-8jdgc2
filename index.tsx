import React, { Component } from "react";
import { render } from "react-dom";
import { ButtonCounter } from "./ButtonCounter";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import "./style.css";

interface Row {
  check: boolean, name: string, status: boolean, label: string
}

interface AppState {
  data: Row[], edit: boolean, page: number, pages: number, tpage: number
}

class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { check: false, name: 'Lorena Salas', status: true, label: 'Label'},
        { check: false, name: 'Emily Yanez', status: false, label: 'Label'},
      ],
      edit: false,
      page: 0,
      pages: 5,
      tpage: 5
    };

    this.onChange = this.onChange.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickActivate = this.onClickActivate.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.PaginationCustom = this.PaginationCustom.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChange(event){
    const {target: {name, value, type, checked}} = event;
    let { data } = this.state;
    const _value = type === 'checkbox' ? checked : value;
    data[value][name] = _value;
    this.setState({data});
  };

  onChangeInput(event, row, index){
    const {target: {name, value, type, checked}} = event;
    let { data } = this.state;
    const _value = type === 'select-one' ? (value == 1 ? true : false) : value;
    data[index][name] = _value;
    this.setState({data});
  };

  onClickDelete(){
    let {data} = this.state;
    data.forEach(function(element, index){
      if(element.check) {
        data.splice(index, 1);
      }
    });
    this.setState({data});
  };

  onClickActivate(index){
    let {data} = this.state;
    data[index].status = !data[index].status;
    this.setState({data});
  };

  onClickEdit(){
    const {edit, data} = this.state;
    const total = data.filter((element) => { return element.check }).length;
    if(total > 0)
      this.setState({edit: !edit});
  };

  CheckColumn(params){
    const {check, onChange, value, edit} = params;
    return (<input type="checkbox" name="check" defaultChecked={check} onChange={(event) => {onChange(event)}} value={value} disabled={edit}/>);
  };

  NameColumn(params){
    const { name, edit, check, onChangeInput } = params;
    return (edit && check) ? (<input type="text" name="name" value={name} className={'form-control'} onChange={onChangeInput}/>) : name;
  }

  StatusColumn(params){
    const { edit, status, check, onChangeInput } = params;
    return (edit && check) ? (<select name="status" className="form-control" onChange={onChangeInput} defaultValue={status ? 1 : 0}>
                                <option key={`s-0`} value={1} selected={status}>Active</option>
                                <option key={`s-1`} value={0} selected={!status}>Inactive</option>
                              </select>) : (<Badge variant={status ? "success" : "danger"}>
                                              {status ? 'Active' : 'Inactive' }
                                            </Badge>);
  }
  
  DescriptionColumn(params){
    const { edit, label, check, onChangeInput } = params;
    return (edit && check) ? (<input type="text" name="label" value={label} className={'form-control'} onChange={onChangeInput}/>) : label;
  }

  ActionColumn(params){
    const { edit, check, onClickActivate, key, status, onChangeInput } = params;
    return (<Button 
              variant={status ? 'outline-danger' : 'outline-success' } 
              onClick={() => onClickActivate(key)}
              disabled={(edit && check)}
              onChange={onChangeInput}
            >
              {status ? 'Deactivate' : 'Activate'}
            </Button>);
  }

  PaginationCustom() {
    const {onChangePage} = this;
    const {page, pages} = this.state;
    const total = pages - 1;
    return (<Pagination className="float-right">
                  <Pagination.Prev onClick={(e) => this.setState({page: page - 1})} disabled={page===0}/>
                  {(page > 1 && pages > 3) && <Pagination.Ellipsis />}
                  {page > 0 && <Pagination.Item onClick={(e) => this.setState({page: page - 1})}>{page}</Pagination.Item>}
                  <Pagination.Item active>{page + 1}</Pagination.Item>
                  {page < total && <Pagination.Item onClick={(e) => this.setState({page: page + 1})}>{page + 2}</Pagination.Item>}
                  {page < (total-1) && <Pagination.Ellipsis />}
                  <Pagination.Next onClick={(e) => this.setState({page: page + 1})} disabled={page===total}/>
                </Pagination>);
  }

  onChangePage(page) {
    this.setState({page});
    console.log('actualizar tabla');
  }

  render() {
    const {state, CheckColumn, onChange, onClickActivate, NameColumn, DescriptionColumn, ActionColumn, StatusColumn, onChangeInput, PaginationCustom} = this;
    const {data, edit} = state;
    
    return (
      <div className="container mt-3">
        <h1 className="text-center">React Test</h1>
        <Table striped hover>
          <thead>
            <tr>
              <th scope="col"><input type="checkbox" name="select" disabled/></th>
              <th scope="col">Name</th>
              <th scope="col">Descripción</th>
              <th scope="col">Estado</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(function(element, index){
                const {check, name, status, label} = element;
                return (<tr key={index}>
                          <th scope="row">
                            <CheckColumn 
                              key={index} 
                              cheack={check} 
                              onChange={(event) => { onChange(event) }} 
                              value={index}
                              edit={edit}
                            />
                          </th>
                          <td>
                            <NameColumn 
                              key={index} 
                              name={name} 
                              edit={edit} 
                              check={check}
                              onChangeInput={(event) => { onChangeInput(event, element, index) }} 
                            />
                          </td>
                          <td>
                            <DescriptionColumn 
                              key={index} 
                              label={label} 
                              edit={edit} 
                              check={check}
                              onChangeInput={(event) => { onChangeInput(event, element, index) }} 
                            />
                          </td>
                          <td>
                            <StatusColumn 
                              key={index}
                              status={status}
                              edit={edit}
                              check={check}
                              onChangeInput={(event) => { onChangeInput(event, element, index) }} 
                            />
                          </td>
                          <td><ActionColumn key={index} edit={edit} check={check} onClickActivate={onClickActivate} status={status}/></td>
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

render(<App />, document.getElementById("root"));