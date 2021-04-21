import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listItems } from './graphql/queries';
import { createItem as createItemMutation, deleteItem as deleteItemMutation } from './graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


//const initialFormState = { name: '', description: '' }
const initialFormState = { name: '', description: '', url:'' }

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const apiData = await API.graphql({ query: listItems });
    const itemsFromAPI = apiData.data.listItems.items;
    await Promise.all(itemsFromAPI.map(async item => {
      if (item.image) {
        const image = await Storage.get(item.image);
        item.image = image;
      }
      return item;
    }))
    setItems(apiData.data.listItems.items);
  }

  async function createItem() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createItemMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setItems([ ...items, formData ]);
    setFormData(initialFormState);
  }

  async function deleteItem({ id }) {
    const newItemsArray = items.filter(item => item.id !== id);
    setItems(newItemsArray);
    await API.graphql({ query: deleteItemMutation, variables: { input: { id } }});
  }

  async function onChangeFile(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchItems();
  }

  return (
    <div className="App">
      <h1>Food Stock 0421</h1>
      <div style={{marginBottom: 30}}>
        {
          items.map(item => (
            <Card>
            <Card.Body>
              {/* <div className="container-fluid"> */}
              <div className="row" key={item.id}>
                <div className="col-4">
                  <img src={item.image} style={{width: 50,height:50}} alt=""/>
                </div>
                <div className="col-6">
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>
                <div className="col-2">
                  <div>{item.description}</div>
                  <Button onClick={() =>  deleteItem(item)} variant="outline-primary">Delete</Button>
                </div>
              </div>              
            </Card.Body>
            </Card>
          ))
        }
        </div>

      {/* <div class="container-fluid"> */}
      <div class="row">
        <div class="col-3">
          <input type="file" onChange={onChangeFile}
          />
        </div>
        <div class="col-2">
          <input
            value={formData.name} placeholder="name"
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          />
        </div>
        <div class="col-2">
          <input
            value={formData.description} placeholder="description"
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          />
        </div>
        <div class="col-3">
          <input
            value={formData.description} placeholder="urlzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          />
        </div>
        <div class="col-2">
          <Button onClick={createItem} variant="outline-primary">ADD</Button>
        </div>

      {/* </div>               */}
      </div>              

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
// export default App;