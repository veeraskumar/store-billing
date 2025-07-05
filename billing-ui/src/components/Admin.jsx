import { useEffect, useState } from "react";
import expressApi from "../api/express";
import brandLogo from "../assets/M9t6b801.svg";

const Admin = () => {
  const [productsData, setProductsData] = useState([]);
  const [findData, setFindData] = useState({
    labelNo: "",
    productName: "",
    price: "",
  });
  const [login, setLogin] = useState(true);
  const [passWord, setPassWord] = useState("");
  const [isExistingProduct, setIsExistingProduct] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await expressApi.get("/");
        setProductsData(response.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchProducts();
  }, []);

  const handleAdminPass = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (passWord === "hello") {
        setLogin(false);
        setPassWord("");
      } else {
        alert("Incorrect password");
      }
    }
  };

  const handleInputChange = (field, value) => {
    if (!productsData) return;

    if (field === "labelNo") {
      value = value.replace(/\D/g, "");
    }

    if (field === "price") {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    setFindData((prev) => {
      const updated = { ...prev, [field]: value };

      const found = productsData.find(
        (p) => p.labelNo === updated.labelNo.trim()
      );

      if (found) {
        return {
          labelNo: found.labelNo,
          productName: field === "productName" ? value : found.productName,
          price: field === "price" ? value : String(found.price),
        };
      }

      return updated;
    });

    const exists = productsData.some(
      (p) =>
        p.labelNo === (field === "labelNo" ? value.trim() : findData.labelNo)
    );
    setIsExistingProduct(exists);
  };

  // Validate form inputs before add/modify
  const isValidInput = () => {
    const { labelNo, productName, price } = findData;
    return (
      labelNo.trim() !== "" &&
      productName.trim() !== "" &&
      !isNaN(parseFloat(price)) &&
      parseFloat(price) >= 0
    );
  };

  // Reload products list
  const reloadProducts = async () => {
    try {
      const response = await expressApi.get("/");
      setProductsData(response.data);
    } catch (err) {
      console.error("Failed to reload products:", err);
    }
  };

  const handleAdd = async () => {
    if (!isValidInput()) {
      alert("Please fill in all fields correctly.");
      return;
    }

    if (!window.confirm("Are you sure you want to add this product?")) return;

    try {
      const res = await expressApi.post("/admin/add-product", {
        labelno: findData.labelNo,
        productname: findData.productName,
        price: parseFloat(findData.price),
      });
      alert(res.data.message || "Product added successfully!");
      await reloadProducts();
      setFindData({ labelNo: "", productName: "", price: "" });
      setIsExistingProduct(false);
    } catch (err) {
      console.error(err);
      alert("Add failed. Product may already exist or inputs may be invalid.");
    }
  };

  const handleDelete = async (labelNo) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await expressApi.delete(`/admin/delete-product/${labelNo}`);
      alert(res.data.message || "Product deleted successfully");
      await reloadProducts();
      setFindData({ labelNo: "", productName: "", price: "" });
      setIsExistingProduct(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  // Modify existing product
  const handleModify = async () => {
    if (!isValidInput()) {
      alert("Please enter valid product name and price.");
      return;
    }

    if (!window.confirm("Are you sure you want to update this product?"))
      return;

    try {
      const res = await expressApi.put(
        `/admin/update-product/${findData.labelNo}`,
        {
          productname: findData.productName,
          price: parseFloat(findData.price),
        }
      );
      alert(res.data.message || "Product updated successfully!");
      await reloadProducts();
      setFindData({ labelNo: "", productName: "", price: "" });
      setIsExistingProduct(false);
    } catch (err) {
      console.error("Modify error:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="w-100">
      {login ? (
        <div
          className="card text-center mx-auto"
          style={{
            width: "22rem",
            height: "18rem",
            boxShadow: "3px 3px 10px grey",
          }}
        >
          <img className="card-img-top" src={brandLogo} alt="Brand Logo" />
          <div className="card-body">
            <h5>Owner Name</h5>
            <input
              type="password"
              minLength={6}
              maxLength={15}
              value={passWord}
              className="form-control w-100 border-danger"
              onChange={(e) => setPassWord(e.target.value)}
              onKeyDown={handleAdminPass}
              placeholder="password"
              autoFocus
            />
          </div>
        </div>
      ) : (
        <div className="w-95 d-flex flex-column justify-content-center align-items-center">
          <div className="just-find w-95">
            <table className="table table-bordered border-info">
              <tbody>
                <tr>
                  <td>
                    <input
                      className="form-control text-center"
                      type="text"
                      placeholder="label No"
                      id="labelno"
                      value={findData.labelNo}
                      onChange={(e) =>
                        handleInputChange("labelNo", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="form-control text-center"
                      type="text"
                      placeholder="product name"
                      id="productname"
                      value={findData.productName}
                      onChange={(e) =>
                        handleInputChange("productName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="form-control text-center"
                      type="text"
                      placeholder="price"
                      id="price"
                      value={findData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                    />
                  </td>
                  <td className="text-center">
                    {isExistingProduct ? (
                      <>
                        <button
                          className="btn btn-warning mx-2"
                          onClick={handleModify}
                          disabled={!isValidInput()}
                        >
                          Modify
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(findData.labelNo)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-success mx-2"
                        onClick={handleAdd}
                        disabled={!isValidInput()}
                      >
                        Add
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex w-100 justify-content-evenly">
            <table className="table table-responsive table-info table-bordered border-danger w-95">
              <thead className="table-active">
                <tr>
                  <th className="text-center" scope="col">
                    No
                  </th>
                  <th className="text-center" scope="col">
                    Label No
                  </th>
                  <th className="text-center" scope="col">
                    Product Name
                  </th>
                  <th className="text-center" scope="col">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsData.map(({ labelNo, productName, price }, index) => (
                  <tr key={labelNo}>
                    <td>{index + 1}</td>
                    <td>{labelNo}</td>
                    <td>{productName}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
