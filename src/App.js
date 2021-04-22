import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listItems } from './graphql/queries';
import { createItem as createItemMutation, deleteItem as deleteItemMutation } from './graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//import { faEdit,faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faAmazon } from "@fortawesome/free-brands-svg-icons";

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
        //const image = await Storage.get(item.image);
        const imageUrl = await Storage.get(item.image);
        item.image = imageUrl;
      }
      return item;
    }))
    setItems(apiData.data.listItems.items);
  }

  async function createItem() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createItemMutation, variables: { input: formData } });
    if (formData.image) {
      const imageUrl = await Storage.get(formData.image);
      formData.image = imageUrl;
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

  const editItem = (item) => {
    setFormData({ image: item.image, name: item.name, description: item.description, url:item.url});
  }

  return (
    <div className="App">
      <h1>Food Stock 0422</h1>
      <div style={{marginBottom: 30}}>
        {
          items.map(item => (
            <Card>
            <Card.Body>
              <div className="row" key={item.id} onClick={() => editItem(item)}>
                <div className="col-4">
                  <img src={item.image} className="AppImage" alt=""/>
                </div>
                <div className="col-6">
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>

                <div className="col-2">
                  <a className="btn btn-primary m-1" href={item.url} role="button">
                    <FontAwesomeIcon icon={faAmazon} />
                  </a>
                  <button type="button" 
                    onClick={() =>  deleteItem(item)} className="btn btn-primary">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>

              </div>              
            </Card.Body>
            </Card>
          ))
        }
        </div>

      {/* <div class="row"> */}
      <div class="AppInput">
        <div class="col-2 m-1">
        {/* <div class="col-2 m-1" style={{background: "#000000"}}> */}
          <input type="file" onChange={onChangeFile}
          />
        </div>
        <div class="col-12 m-1">
          <input
            readOnly
            className="form-control"
            id="itemimage" 
            value={formData.image} placeholder="image filename"
          />
        </div>
        <div class="col-2 m-1">
          <input
            value={formData.name} placeholder="item name" size="40"
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          />
        </div>
        <div class="col-2 m-1">
          <input
            value={formData.description} placeholder="賞味期限"
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          />
        </div>
        <div class="col-2 m-1">
          <input
            value={formData.url} placeholder="amazon url" size="40"
            onChange={e => setFormData({ ...formData, 'url': e.target.value})}
          />
        </div>
        <div class="col-2 m-1" align="left">
          <Button onClick={createItem} variant="primary">ADD</Button>
        </div>

      </div>              

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
// export default App;