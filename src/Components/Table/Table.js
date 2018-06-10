import React from 'react';
import './Table.css'

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mglt: '',
      manufacturer: '',
      name: '',
      model: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    this.setState({[name]: value})
  }

  render() {
    const {model, manufacturer, name, mglt} = this.state;
    const filteredElements = this.props.data
      .filter(e => e.name.includes(name))
      .filter(e => e.MGLT.includes(mglt))
      .filter(e => e.manufacturer.includes(manufacturer))
      .filter(e => e.model.includes(model))
      .map((item, key) => (
        <tr key={key}>
          <td>
            {item.name}
          </td>
          <td>
            {item.model}
          </td>
          <td>
            {item.manufacturer}
          </td>
          <td>
            {item.MGLT}
          </td>
        </tr>
      ));

    return (
      <div className="container">
        <table className='table'>
          <thead>
          <tr>
            <th>
              Name
              <input type="text"
                     name="name"
                     value={name}
                     onChange={this.onInputChange}/>
            </th>
            <th>
              Model
              <input type="text"
                     name="model"
                     value={model}
                     onChange={this.onInputChange}/>
            </th>
            <th>
              Manufacturer
              <input type="text"
                     name="manufacturer"
                     value={manufacturer}
                     onChange={this.onInputChange}/>
            </th>
            <th>
              MGLT
              <input type="text"
                     name="mglt"
                     value={mglt}
                     onChange={this.onInputChange}/>
            </th>
          </tr>
          </thead>
          <tbody>

          {filteredElements}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
