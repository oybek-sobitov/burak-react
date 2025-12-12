import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverAPi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data))
});

const productsRetriever = createSelector(
  retrieveProducts, 
  (products) => ({products})
);

export default function Products(){

    const {setProducts} = actionDispatch(useDispatch());
    const {products} = useSelector(productsRetriever);
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
            page: 1,
            limit: 8,
            order: "createdAt",
            productCollection: ProductCollection.DISH,
            search: ""
        });

    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();

    useEffect(() => {
        const product = new ProductService();
        product
            .getProducts(productSearch)
            .then((data) => setProducts(data))
            .catch(err => console.log(err));
    }, [productSearch]);

    useEffect(() => {
        if(searchText === "") {
            productSearch.search = "";
            setProductSearch({...productSearch});
        }

    }, [searchText]);


    // HENDLERS

    const searchCollectionHandler = (collection: ProductCollection) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({...productSearch});
    };

    const searchOrderHandler = (order: string) => {        
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({...productSearch});
    };

    const searchProductHandler = () => {
        productSearch.search = searchText;
        setProductSearch({...productSearch});
    }

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({...productSearch});
    }

    const chooseDishHandler = (id: string) => {
        history.push(`/products/${id}`);     
    }

    return (
    <div className={"products"}>
        <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Stack className={"avatar-big-box"}>
                    <Box className="category-title">Burak Restaurant</Box>
                    <Box className="search-box">
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            className="text-field"
                            placeholder="Type here"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {searchText && (
                                            <IconButton
                                                aria-label="clear text"
                                                onClick={() => setSearchText('')}
                                                edge="end"
                                                size="small"
                                                disableRipple
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                            onKeyDown={(e) => {
                                if(e.key === "Enter") searchProductHandler();
                            }}
                        />
                            <Button 
                                variant="contained" 
                                className="search-button"
                                onClick={searchProductHandler}
                            >
                                Search <SearchIcon className="search-icon" />
                            </Button>
                    </Box>
                </Stack>

                <Stack className={"dishes-filter-section"}>
                    <Stack className={"dishes-filter-box"}>
                        <Button
                            variant={"contained"}
                            color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                            className={"order"}
                            onClick={() => searchOrderHandler("createdAt")}
                        >
                            New
                        </Button>
                        <Button
                            variant={"contained"}
                            color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                            className={"order"}
                            onClick={() => searchOrderHandler("productPrice")}
                        >
                            Price
                        </Button>
                        <Button
                            variant={"contained"}
                            color={productSearch.order === "productViews" ? "primary" : "secondary"}
                            className={"order"}
                            onClick={() => searchOrderHandler("productViews")}
                        >
                            Views
                        </Button>
                    </Stack>
                </Stack>

                <Stack className={"list-category-section"}>
                    <Stack className={"product-category"}>
                        <div className={"category-main"}>
                            <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.OTHER 
                                    ? "primary" 
                                    : "secondary"
                                } 
                                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                            >
                                Other
                            </Button>
                            <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.DESSERT 
                                    ? "primary" 
                                    : "secondary"
                                }
                                onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
                            >
                                Dessert
                            </Button>
                            <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.DRINK 
                                    ? "primary" 
                                    : "secondary"
                                }
                                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
                            >
                                Drink
                            </Button>
                            <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.SALAD 
                                    ? "primary" 
                                    : "secondary"
                                }
                                onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                            >
                                Salad
                            </Button>
                            <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.DISH 
                                    ? "primary" 
                                    : "secondary"
                                }
                                onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                            >
                                Dish
                            </Button>
                        </div>
                    </Stack>

                    <Stack className={"product-wrapper"}>
                        {products.length !==0 ? (
                            products.map((product: Product) => {
                                const imagePath = `${serverAPi}/${product.productImages[0]}`
                                const sizeVolume = product.productCollection === ProductCollection.DRINK 
                                ? product.productVolume + " litre" 
                                : product.productSize + " size";
                                return (
                                    <Stack 
                                        key={product._id} 
                                        className={"product-card"} 
                                        onClick={() => chooseDishHandler(product._id)}
                                    >
                                        <Stack 
                                        className={"product-img"} 
                                        sx={{ backgroundImage: `url(${imagePath})`}}>
                                            <div className={"product-sale"}>{sizeVolume}</div>
                                            <Button className={"shop-btn"}>
                                                <img src={"/icons/shopping-cart.svg"}
                                                style={{display: "flex"}}
                                                />
                                            </Button>
                                            <Button className={"view-btn"} sx={{right: "36px"}}>
                                                <Badge badgeContent={product.productViews} color="secondary">
                                                    <RemoveRedEyeIcon
                                                    sx={{
                                                        color: product.productViews === 0 ? "gray" : "white",
                                                    }}
                                                    />
                                                </Badge>
                                            </Button>
                                        </Stack>
                                        <Box className={"product-desc"}>
                                            <span className={"product-title"}>
                                                {product.productName}
                                            </span>
                                            <div className={"product-desc"}>
                                                <MonetizationOnIcon/>
                                                {product.productPrice}
                                            </div>
                                        </Box>
                                    </Stack>
                                );
                            })
                        ) : (
                            <Box className={"no-data"}>Products are not available!</Box>
                        )}
                    </Stack>
                </Stack>

                <Stack className={"pagination-section"}>
                    <Pagination 
                    count={
                        products.length !== 0 
                        ? productSearch.page + 1 
                        : productSearch.page
                    }
                    page={productSearch.page}
                    renderItem={(item) => (
                        <PaginationItem
                        components={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                        }}
                        {...item}
                        color={"secondary"}
                        />
                    )}
                    onChange={paginationHandler}
                    />
                </Stack>
            </Stack>
        </Container>

        <div className={"brands-logo"}>
            <Container className={"family-brands"}>
                <Box className={"category-title"}>Our Family Brands</Box>
                <Stack className={"brand-list"}>
                    <Box className={"review-box"}>
                        <img src={"/img/gurme.webp"} />
                    </Box>
                    <Box className={"review-box"}>
                        <img src={"/img/seafood.webp"} />
                    </Box>
                    <Box className={"review-box"}>
                        <img src={"/img/sweets.webp"} />
                    </Box>
                    <Box className={"review-box"}>
                        <img src={"/img/doner.webp"} />
                    </Box>
                </Stack>
             </Container> 
        </div>

        <div className={"address"}>
            <Container>
                <Stack className={"address-area"}>
                    <Box className={"title"}>Our adsress</Box>
                        <iframe
                        style={{ marginTop: "60px" }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101202.52524817457!2d126.89173964558682!3d37.56498353964936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca28b61c565cd%3A0x858aedb4e4ea83eb!2z0KHQtdGD0Ls!5e0!3m2!1sru!2skr!4v1737713569639!5m2!1sru!2skr"
                        width="1320"
                        height="500"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Stack>
            </Container>
        </div> 
    </div>
    );
}