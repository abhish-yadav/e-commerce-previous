import React, { useState } from "react";
import {
  Card,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async (e) => {
    e.preventDefault();
    //custom validation
    if (!name || !price || !category || !company) {
      setError(true);
      Swal("Fields are required, please provide.");
      return false;
    }

    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(userId);
    let result = fetch("http://localhost:9003/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.data, Swal("Item added successfully"));
    result = await result.json();
    console.log(result);
  };

  return (
    <>
      <Card>
        <Form>
          <h3>Add Product</h3>
          <FormGroup className="mb-2">
            <FormLabel>Product Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Product Name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {error && !name && <span>Please enter the Name</span>}
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel>Price</FormLabel>
            <FormControl
              type="text"
              placeholder="Price"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            {error && !price && <span>Please enter the Price</span>}
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel>Category</FormLabel>
            <FormControl
              type="text"
              placeholder="Which Category"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            {error && !category && <span>Please enter the Category</span>}
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel>Company</FormLabel>
            <FormControl
              type="text"
              placeholder="Company Name"
              name="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
            {error && !company && <span>Please enter the Company</span>}
          </FormGroup>
          <Button type="submit" onClick={addProduct}>
            Add Product
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default AddProducts;
