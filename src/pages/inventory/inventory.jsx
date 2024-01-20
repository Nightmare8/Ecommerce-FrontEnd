import { useEffect, useState } from 'react';
import Header from '../../components/Header'
import { useTheme } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material';
//Icons
import AddBoxIcon from '@mui/icons-material/AddBox';
//Componentes
import AddDialog from './addDialog';
import TabBody from '../../components/TabBody';
import LoadingEffect from '../../components/LoadingEffect.jsx';
//Api
import { productRoutes } from "../../api/config.js";
//Redux
import { useSelector } from "react-redux";


const filterProducts = (products) => {
    const uniquesNames = new Set();
    const filteredProducts = [];
    console.log("products", products)
    products.forEach((product) => {
        if (product.estado === 'stock') {
            if (!uniquesNames.has(product.codigo)) {
                uniquesNames.add(product.codigo);
                product.stock = 1;
                filteredProducts.push(product);
            } else {
                const index = filteredProducts.findIndex((item) => item.nombre === product.nombre);
                filteredProducts[index].stock++;
            }
        }
    });
    console.log("filteredProducts", filteredProducts)
    return filteredProducts;
}

const headCells = [
    {
        id: 'idProducto',
        numeric: false,
        label: 'SKU',
    },
    {
        id: 'titulo',
        numeric: false,
        label: 'Nombre',
    }, {
        id: 'categoria',
        numeric: false,
        label: 'Categoría',
    }, {
        id: 'precio',
        numeric: false,
        label: 'Precio',
    },
    {
        id: 'cantidad',
        numeric: false,
        label: 'Stock',
    },
    {
        id: 'proveedor',
        numeric: false,
        label: 'Proveedor',
    },
]


function Inventory() {
    const theme = useTheme();
    //User 
    const user = useSelector((state) => state.auth.user);
    //Stock
    const [rows, setRows] = useState([]);
    //Loading
    const [loading, setLoading] = useState(true);
    //Use effect
    useEffect(() => {
        setLoading(true);
        let url = productRoutes.get + user.company;
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("response", response)
            return response.json()
        }).then(data => {
            console.log("data", data)
            setRows(data);
        }).catch(error => console.log(error)).finally(() => setLoading(false));
    }, [user.company])

    //Form Dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
                width: '100%',
            }}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
            >
                {/* Agregar producto */}
                <Header title='Inventario' subTitle={'De Empresa'} />
                <Stack direction={'row'} spacing={2}>
                    <Button
                        variant="contained"
                        startIcon={<AddBoxIcon />}
                        onClick={handleClickOpen}
                        sx={{
                            backgroundColor: theme.palette.button.main,
                            height: '50%',
                        }}
                    >
                        Agregar Producto
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddBoxIcon />}
                        onClick={handleClickOpen}
                        sx={{
                            backgroundColor: theme.palette.button.main,
                            height: '50%',
                        }}
                    >
                        Toma de Inventario
                    </Button>

                </Stack>
                <AddDialog open={open} handleClose={handleClose} />
            </Box>
            {
                loading ? <LoadingEffect /> :
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        paddingTop={1}
                        width={'100%'}
                    >
                        <TabBody rows={rows} setRows={setRows} headCellsAux={headCells} />
                    </Box>
            }
        </Box>
    )
}

export default Inventory