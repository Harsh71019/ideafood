import React, { useEffect } from "react";
import { Row, Button, Col, Table, Card, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: deleteError,
    success: deleteSuccess,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createLoading,
    error: createdError,
    success: createdSuccess,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (createdSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    deleteSuccess,
    createdSuccess,
    createdProduct,
    pageNumber,
  ]);

  const deleteProducts = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Container className="mt-5">
        {loadingDelete && <Loader />}
        {deleteError && <Message variant="danger">{deleteError}</Message>}

        {createLoading && <Loader />}
        {createdError && <Message variant="danger">{createdError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Card className="card-login w-100 table-card-border shadow-lg">
              <Card.Body className="px-0 pt-0 pb-2">
                <div className="row">
                  <div className="col">
                    <h3 className="headingstyles text-center mt-3 mb-3">
                      Products in Inventory
                    </h3>
                  </div>
                  <div className="col text-right d-flex justify-content-end">
                    <button className="my-3 mr-5 create-button-product" onClick={createProductHandler}>
                      <i className="fas fa-plus"></i> Create Product
                    </button>
                  </div>
                </div>
                <div class="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="th-border-none fontstylesth">ID</th>
                        <th className="th-border-none fontstylesth">NAME</th>
                        <th className="th-border-none fontstylesth">PRICE</th>
                        <th className="th-border-none fontstylesth">
                          CATEGORY
                        </th>
                        <th className="th-border-none fontstylesth">BRAND</th>
                        <th className="th-border-none fontstylesth">
                          EDIT PRODUCTS
                        </th>
                        <th className="th-border-none fontstylesth">
                          DELETE PRODUCTS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td className="text-table">{product._id}</td>
                          <td className="text-table">{product.name}</td>
                          <td className="text-table">₹{product.price}</td>
                          <td className="text-table">{product.category}</td>
                          <td className="text-table">{product.brand}</td>
                          <td>
                            <LinkContainer
                              to={`/admin/product/${product._id}/edit`}
                            >
                              <a className="edit-button-tables">
                                <i class="fas fa-pencil-alt mr-2"></i> Edit
                              </a>
                            </LinkContainer>
                          </td>
                          <td>
                            <a
                              className="delete-button-tables"
                              onClick={() => deleteProducts(product._id)}
                            >
                              <i class="far fa-trash-alt mr-2"></i>
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
            <Paginate page={page} pages={pages} isAdmin={true} />
          </>
        )}
      </Container>
    </>
  );
};

export default ProductListScreen;
