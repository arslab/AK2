// import './App.css';
// import './Kintai.css';
// // import { listItems } from './graphql/queries';
// // import { createItem as createItemMutation, deleteItem as deleteItemMutation } from './graphql/mutations';
// // import { updateItem as updateItemMutation } from './graphql/mutations';

// import React, { useState, useEffect } from 'react';

// // import { API, Storage } from 'aws-amplify';
// // import { withAuthenticator} from '@aws-amplify/ui-react';
// // import { AmplifySignOut } from '@aws-amplify/ui-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// //import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function KintaiSummary() {
//   const [items, setItems] = useState([]);
//   //const [employees, setEmployees] = useState([]);
//   // const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   //async function fetchItems(useid) {
//   async function fetchItems() {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     var raw = JSON.stringify({"UserID": "99117"});
//     var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
//     fetch("https://el2gjqf1n3.execute-api.ap-northeast-1.amazonaws.com/dev", requestOptions)
//     .then(response => response.text())
//     .then(async(response) => {
//       const apiData = JSON.parse(response);
//         setItems(apiData);  
//         setEmployees(apiData);
//         console.log("setEmployees");
//       })
//     .catch(error => console.log('error', error));
//     //alert(response);
//   }

//   return (
//     <div className="mt-5 mb-5 container-fluid AppBg0">

//       <div style={{marginTop: 10,marginBottom: 30}}>
//         {
//           items.map(item => (
//             <Card key={item.id}>
//             <Card.Body className="AppBg1">
//                   <div>{item.UserID}  {item.Date} {item.Time} {item.TrxCode}</div>         
//             </Card.Body>
//             </Card>
//           ))
//           // employees.map(employee => (
//           //   <Card key={employee.id}>
//           //   <Card.Body className="AppBg1">
//           //         <div>{employee.UserID}  {employee.Date} {employee.Time}</div>         
//           //   </Card.Body>
//           //   </Card>
//           // ))
//         }
//       </div>

//       {/* <AmplifySignOut /> */}
//     </div>
//   );
// }

// //export default withAuthenticator(Kintai);
// export default KintaiSummary;
