import './App.css';
import './AlStock.css';
import { listItems } from './graphql/queries';
import { createItem as createItemMutation, deleteItem as deleteItemMutation } from './graphql/mutations';
import { updateItem as updateItemMutation } from './graphql/mutations';

import React, { useState, useEffect } from 'react';

import { API, Storage } from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
// import { AmplifySignOut } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//import { faEdit,faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faAmazon } from "@fortawesome/free-brands-svg-icons";

const initialFormState = {name: '', description: '', image:'',  imagepath:'',  
                          limit: '', life:'', bal:'', url:'' }

function setBal(props, bal) {
  props.item.bal = bal;
}

function AlStockBar(props) {
  if(props.item.bal==="1") {
    return (
      <div className="row">
        <div className="AlBarR col" onClick={() => setBal(props,"1")}>{props.item.bal}</div>
        <div className="AlBarW col">{props.item.bal}</div>
        <div className="AlBarW col">{props.item.bal}</div>
      </div>
    )
  }
  else if(props.item.bal==="2") {
    return (
      <div className="row">
        <div className="AlBarY col">{props.item.bal}</div>
        <div className="AlBarY col">{props.item.bal}</div>
        <div className="AlBarW col">{props.item.bal}</div>
      </div>
    )
  }
  else 
  return (
      <div className="row">
        <div className="AlBarG col">{props.item.bal}</div>
        <div className="AlBarG col">{props.item.bal}</div>
        <div className="AlBarG col">{props.item.bal}</div>
      </div>
    )
}

function AlStock() {
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
        const imageUrl = await Storage.get(item.image);
        item.imagepath = imageUrl;
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
      formData.imagepath = imageUrl;
    }
    setItems([ ...items, formData ]);
    setFormData(initialFormState);
  }

  async function updateItem() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: updateItemMutation, variables: { input: formData } });
    if (formData.image) {
      const imageUrl = await Storage.get(formData.image);
      formData.imagepath = imageUrl;
    }
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
    if (!item.image)     { item.image = ''; }
    if (!item.imagepath) { item.imagepath = ''; }
    if (!item.life)      { item.life  = ''; }
    if (!item.bal)       { item.bal   = ''; }
    if (!item.url)       { item.url   = ''; }
    setFormData({ id: item.id,
                  name:  item.name,  description: item.description, 
                  image: item.image, imagepath:   item.imagepath,
                  life:  item.life,  bal:         item.bal, 
                  url:   item.url  });
  }

  return (
    <div className="mt-5 mb-5 container-fluid AppBg0">

      <header className="fixed-top AppHeader AppBg2">
            <div className="col-4">Food Stock 0608</div>
            <div className="col-6">
              <div>在庫</div>
              <div>賞味期限</div>
            </div>
            <div className="col-2">再注文</div>
      </header>

      <div style={{marginBottom: 30}}>
        {
          items.map(item => (
            <Card key={item.id}>
            <Card.Body className="AppBg1">
              <div className="row" onClick={() => editItem(item)}>
                <div className="col-4">                      {/* イメージ */}
                  <img src={item.imagepath} className="AppImage" alt=""/>
                  <div>{item.name}</div>                      {/* アイテム名 */}
                </div>
                <div className="col-6">
                  <div>{item.name}</div>                      {/* アイテム名 */}
                  <div>{item.description}</div>               {/* 賞味期限   */}
                  <AlStockBar item={item}></AlStockBar>
                </div>

                <div className="col-2">                      {/* Amazonボタン */}
                  <a role="button" className="btn btn-primary m-1"
                    href={item.url}>
                    <FontAwesomeIcon icon={faAmazon} />
                  </a>
                                                              {/* 削除ボタン */}
                  <button type="button" className="btn btn-primary m-1"
                    onClick={() =>  deleteItem(item)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>

              </div>              
            </Card.Body>
            </Card>
          ))
        }
      </div>

      <div className="AppInput">
        {/* イメージファイル */}
        <div className="col-2 m-1">                    
          <input type="file" onChange={onChangeFile}
          />
        </div>
        <div className="col-12 m-1">
          <input
            readOnly className="form-control" id="itemimage" 
            value={formData.image} placeholder="image filename"
          />
        </div>
        {/* イメージfilepath */}
        <div className="col-12 m-1">
          <input
            readOnly className="form-control" id="itemimagepath" 
            value={formData.imagepath} placeholder="image path"
          />
        </div>
        {/* アイテム名 */}
        <div className="col-2 m-1">
          <input
            value={formData.name} placeholder="item name" size="40"
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          />
        </div>

        {/* 賞味期限 */}
        <div className="col-2 m-1">
          <input
            value={formData.description} placeholder="賞味期限"
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          />
        </div>

        {/* life */}
        <div className="col-2 m-1">                       
          <input
            value={formData.life} placeholder="life"
            onChange={e => setFormData({ ...formData, 'life': e.target.value})}
          />
        </div>
        
        {/* bal */}
        <div className="col-2 m-1">
          <input
            value={formData.bal} placeholder="bal"
            onChange={e => setFormData({ ...formData, 'bal': e.target.value})}
          />
        </div>

        {/* Amazon URL */}
        <div className="col-2 m-1"> 
          <input
            value={formData.url} placeholder="amazon url" size="40"
            onChange={e => setFormData({ ...formData, 'url': e.target.value})}
          />
        </div>
        <div className="col-2 m-1" align="left">          {/* ADD ボタン */}
          <Button onClick={createItem} variant="primary">ADD</Button>
        </div>
        <div className="col-2 m-1" align="left">          {/* ADD ボタン */}
          <Button onClick={updateItem} variant="primary">UPDATE</Button>
        </div>

      </div>              

      {/* <AmplifySignOut /> */}
    </div>
  );
}

export default withAuthenticator(AlStock);
// export default App;