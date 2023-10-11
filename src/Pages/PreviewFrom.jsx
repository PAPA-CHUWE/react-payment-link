// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {
  InputLabel,
  TextField,
  Snackbar,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Select from "react-select";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CloseIcon from "@mui/icons-material/Close";

const PreviewFrom = () => {
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setcustomerPhone] = useState("");
  const [pickupAddress, setpickupAddress] = useState("");
  const [deliveryAddress, setdeliveryAddress] = useState("");
  const [deliveryType, setdeliveryType] = useState("");
  const [amount, setAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [dateOfTrans, setdateOfTrans] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [open, setOpen] = React.useState(false);

  const handlePay = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setPaymentId(searchParams.get("paymentId"));
  }, [location.search]);

  async function makePaymentRequest() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/payment/1697005602766588GY7F`
      );
      if (response.ok) {
        const data = await response.json();
        setOrderId(data.orderId);
        setCustomerName(data.customerName);
        setSupplierName(data.supplierName);
        setcustomerPhone(data.customerPhone);
        setpickupAddress(data.pickUpAddress);
        setdeliveryAddress(data.deliveryAddress);
        setdeliveryType(data.deliveryType);
        setAmount(data.amount);
        setProductName(data.productName);
        setSupplierName(data.supplierName);
        setdateOfTrans(data.dateOfTransactions);
        setStatus(data.status);
      } else {
        throw new Error("Failed to fetch payment data");
      }
    } catch (error) {
      console.error(error);
    }
  }

  makePaymentRequest();

  const options = [
    { value: "cash", label: "Cash" },
    { value: "ecocash", label: "Ecocash" },
    { value: "bank transfer", label: "Bank Transfer" },
    { value: "visa", label: "Visa" },
    { value: "master card", label: "Master Card" },
  ];

  const dateOfTransaction = new Date(dateOfTrans);
  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = `${dateOfTransaction.toLocaleDateString(
    "en-GB",
    dateOptions
  )}`;

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <MDBContainer className="py-5">
      <div className="mb-5 d-flex justify-content-between align-items-center">
        <div className="flex-row d-flex align-items-center">
          <h4 className="mt-1 text-uppercase">Eligible</h4>
          <span className="ms-2 me-3">Pay</span>
        </div>
        <a href="#!">Cancel and return to the website</a>
      </div>
      <MDBRow
        className="my-2 mt-1 d-flex justify-content-between"
        style={{ gap: "5vh" }}
      >
        <MDBCol
          md="5"
          lg="5"
          xl="5"
          className="rounded-lg shadow-lg hover:shadow-lg"
        >
          <div
            className="p-3 text-center"
            style={{
              margin: "10px 10px 0 10px",
            }}
          >
            <span className="fw-bold text-uppercase ">Order Summary</span>
            <div className="mt-2 d-flex justify-content-between">
              <span>Payment Id</span> <span>{paymentId}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Order Id </span> <span>{orderId}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Customer Name</span> <span>{customerName}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Customer Contact</span> <span>{customerPhone}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Product Purchased</span> <span>{productName}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Supplier </span> <span>{supplierName}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>PickUp Address </span> <span>{pickupAddress}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Delivery Address </span> <span>{deliveryAddress}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Delivery Type </span> <span>{deliveryType}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Date Of Transactions </span> <span>{formattedDate}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Status Of Payment </span> <span>{status}</span>
            </div>
            <hr />
            <div className="mt-2 d-flex justify-content-between">
              <span className="lh-sm">Initial Amount</span>
              <span>${amount || "0.00"}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span className="lh-sm">Tax (VAT)</span>
              <span>${0 || "0.00"}</span>
            </div>
            <hr />
            <div className="mt-2 d-flex justify-content-between">
              <span>Insurance Responsibility </span> <span>${0 || "0.00"}</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <span>Discount(%)</span> <span>{0 || "0.00"}%</span>
            </div>
            <hr />
            <div className="mt-2 d-flex justify-content-between">
              <span>Total Balance </span>{" "}
              <span class="text-success">${amount || "0.00"}</span>
            </div>
          </div>
        </MDBCol>
        <MDBCol md="7" lg="7" xl="5" className="mb-4 mb-md-0">
          <h5 className="mb-0 text-success">${amount || "0.00"}</h5>
          <div>
            <div className="d-flex justify-content-between">
              <div className="flex-row mt-1 d-flex">
                <h6>Insurance Responsibility</h6>
                <h6 className="fw-bold text-success ms-1">${0 || "0.00"}</h6>
              </div>
              <div className="flex-row d-flex align-items-center text-primary">
                <span className="ms-1">Add Insurer card</span>
              </div>
            </div>
            <p>
              Insurance claim and all neccessary dependencies will be submitted
              to your insurer for the covered portion of this order.
            </p>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-row mt-1 d-flex">
                <h6>Tax Balance</h6>
                <h6 className="fw-bold text-success ms-1">${0 || "0.00"}</h6>
              </div>
              <div className="flex-row d-flex align-items-center text-primary">
                <span className="ms-1">Add Payment card</span>
              </div>
            </div>
            <p>
              Insurance claim and all neccessary dependencies will be submitted
              to your insurer for the covered portion of this order.
            </p>
            <div class="d-flex flex-column mb-3 text-center">
              <MDBBtnGroup vertical aria-label="Vertical button group">
                <div
                  style={{
                    color: "#000435",
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <InputLabel
                    htmlFor="paymentOption"
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Choose Payment Option
                  </InputLabel>
                  <div style={{ width: "45vh" }}>
                    <Select
                      fullWidth
                      defaultValue={options[0]}
                      options={options}
                    />
                  </div>
                </div>
                <div>
                  <TextField
                    placeholder="Enter Name..."
                    color="success"
                    InputProps={{
                      startAdornment: (
                        <BadgeOutlinedIcon
                          style={{
                            marginRight: "5px",
                            color: "rgba(26, 52, 97, 1)",
                          }}
                        />
                      ),
                      style: {
                        backgroundColor: "white",
                        color: "rgba(26, 52, 97, 1)",
                        padding: "5px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        width: "45vh",
                        textTransform: "uppercase",
                      },
                    }}
                    margin="normal"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value.toUpperCase())
                    }
                  />
                  <TextField
                    placeholder="Enter Address..."
                    InputProps={{
                      startAdornment: (
                        <HomeOutlinedIcon
                          style={{
                            marginRight: "5px",
                            color: "rgba(26, 52, 97, 1)",
                            textTransform: "uppercase",
                          }}
                        />
                      ),
                      style: {
                        backgroundColor: "white",
                        color: "rgba(26, 52, 97, 1)",
                        padding: "5px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        width: "45vh",
                        textTransform: "uppercase",
                      },
                    }}
                    margin="normal"
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value.toUpperCase())
                    }
                  />

                  <TextField
                    placeholder="Enter Account Number..."
                    InputProps={{
                      startAdornment: (
                        <PaymentsOutlinedIcon
                          style={{
                            marginRight: "5px",
                            color: "rgba(26, 52, 97, 1)",
                            textTransform: "uppercase",
                          }}
                        />
                      ),
                      style: {
                        backgroundColor: "white",
                        color: "rgba(26, 52, 97, 1)",
                        padding: "5px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        width: "45vh",
                        textTransform: "uppercase",
                      },
                    }}
                    margin="normal"
                    value={accountNumber}
                    onChange={(event) =>
                      setAccountNumber(event.target.value.toUpperCase())
                    }
                  />
                </div>
              </MDBBtnGroup>
            </div>

            <MDBBtn
              color="success"
              size="lg"
              block
              onClick={handlePay}
              className="my-2"
            >
              <div className="mt-1 d-flex justify-content-between text-uppercase">
                <span>Proceed to payment</span> <span>${amount || "0.00"}</span>
              </div>
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
      <Snackbar
        severity="success"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "0",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`You have successfully paid $${amount}`}
        action={action}
      />
    </MDBContainer>
  );
};

export default PreviewFrom;
