import { useEffect, useState } from "react";
import expressApi from "../api/express.js";
import "../App.css";

const BillingColumns = () => {
  const [productsData, setProductsData] = useState([]);
  const [rows, setRows] = useState([
    {
      labelNo: "",
      productName: "",
      quantity: "",
      price: 0,
      total: 0,
    },
  ]);

  useEffect(() => {
    async function call() {
      const apiCall = await expressApi.get("/");
      const apiDatas = apiCall.data;
      setProductsData(apiDatas);
    }
    call();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];

    updatedRows[index][field] = value;

    if (field === "labelNo" && value.trim() !== "") {
      const found = productsData.find((p) => p.labelNo === value.trim());
      if (found) {
        updatedRows[index].productName = found.productName;
        updatedRows[index].price = found.price;
        setTimeout(() => {
          document.getElementById(`quantity-${index}`)?.focus();
        }, 0);
      }
    }

    if (field === "productName" && value.trim() !== "") {
      const found = productsData.find(
        (p) => p.productName.toLowerCase() === value.trim().toLowerCase()
      );
      if (found) {
        updatedRows[index].labelNo = found.labelNo;
        updatedRows[index].price = found.price;
        setTimeout(() => {
          document.getElementById(`quantity-${index}`)?.focus();
        }, 0);
      }
    }

    if (field === "quantity") {
      const qty = parseFloat(value) || 0;
      updatedRows[index].total = qty * updatedRows[index].price;
    }

    setRows(updatedRows);

    if (
      index === rows.length - 1 &&
      updatedRows[index].price &&
      rows[rows.length - 1].labelNo !== "" &&
      rows[rows.length - 1].productName !== ""
    ) {
      setRows((prev) => [
        ...prev,
        {
          labelNo: "",
          productName: "",
          quantity: "",
          price: 0,
          total: 0,
        },
      ]);
    }
  };

  const grandTotal = parseFloat(
    rows.reduce((sum, row) => sum + (parseFloat(row.total) || 0), 0).toFixed(2)
  );

  const handleReset = () => {
    setRows([
      {
        labelNo: "",
        productName: "",
        quantity: "",
        price: 0,
        total: 0,
      },
    ]);
  };

  const handleQuantityKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(`labelNo-${index + 1}`)?.focus();
    }
  };

  const handlePrint = () => {
    window.print();
    handleReset();
  };

  return (
    <div className="billing-outer w-100">
      <div className="billing-total w-100 h-15 bg-primary d-flex  align-items-center justify-content-around position-sticky top-0 rounded-2">
        <h1 className="text-dark h2 ">Total: ₹ {grandTotal.toFixed(2)}</h1>
        <button
          onClick={handlePrint}
          className="btn btn-light text-capitalize h-75"
        >
          Print
        </button>
        <button
          onClick={handleReset}
          className="btn btn-light text-capitalize h-75"
        >
          Reset
        </button>
      </div>
      <div className="billing">
        <table className="table table-responsive table-info table-bordered  border-danger w-95">
          <thead className="table-active">
            <tr>
              <th className="text-center w-25" scope="col">
                No
              </th>
              <th className="text-center w-100" scope="col">
                Label No
              </th>
              <th className="text-center w-100" scope="col">
                Product Name
              </th>
              <th className="text-center w-50" scope="col">
                Quantity
              </th>
              <th className="text-center w-25" scope="col">
                Price
              </th>
              <th className="text-center w-25" scope="col">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="w-100 text-center" scope="row">
                  {index + 1}
                </td>
                <td>
                  <input
                    type="text"
                    value={row.labelNo}
                    id={`labelNo-${index}`}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      handleInputChange(index, "labelNo", onlyNumbers);
                    }}
                    list="products-label"
                    className="form-control form-control-sm"
                  />
                  <datalist id="products-label">
                    {productsData.map((p) => (
                      <option key={p.labelNo}>{p.labelNo}</option>
                    ))}
                  </datalist>
                </td>
                <td>
                  <input
                    type="text"
                    value={row.productName}
                    onChange={(e) =>
                      handleInputChange(index, "productName", e.target.value)
                    }
                    list="products-list"
                    className="form-control w-100 text-center"
                  />
                  <datalist id="products-list">
                    {productsData.map((p) => (
                      <option key={p.labelNo} value={p.productName}>
                        {p.productName}
                      </option>
                    ))}
                  </datalist>
                </td>
                <td>
                  <input
                    type="text"
                    value={row.quantity}
                    onChange={(e) => {
                      const decimal = e.target.value;
                      if (/^\d*\.?\d*$/.test(decimal)) {
                        handleInputChange(index, "quantity", decimal);
                      }
                    }}
                    onKeyDown={(e) => handleQuantityKeyDown(e, index)}
                    id={`quantity-${index}`}
                    className="form-control text-center"
                  />
                </td>
                <td className="text-center">{row.price}</td>
                <td className="text-center">{row.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingColumns;
