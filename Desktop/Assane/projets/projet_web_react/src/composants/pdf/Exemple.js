import React from 'react'
import {render} from 'react-dom'
import ReactToPrint from 'react-to-print'
import Document from './Document';
//import { ComponentToPrint } from './Exemple';
// class ComponentToPrint extends React.PureComponent {
//     render() {
//       return (
//         <table>
//           <thead>
//             <th>column 1</th>
//             <th>column 2</th>
//             <th>column 3</th>
//           </thead>
//           <tbody>
//             <tr>
//               <td>data 1</td>
//               <td>data 2</td>
//               <td>data 3</td>
//             </tr>
//           </tbody>
//         </table>
//       );
//     }
//   }

  

export default class Example extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#" className="btn btn-primary">Imprimer</a>;
          }}
          content={() => this.componentRef}
        />
        <Document ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}