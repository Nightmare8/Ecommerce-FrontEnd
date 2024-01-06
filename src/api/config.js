export const companyRoutes = {
    getCompany: `${import.meta.env.VITE_USER_BACKEND_URL}/company/`,
    getUserCompany: `${import.meta.env.VITE_USER_BACKEND_URL}/company/users`,
    registerCompany: `${import.meta.env.VITE_USER_BACKEND_URL}/company/register`,
    // getCompany: 'http://localhost:3000/company/',
    // getUserCompany: 'http://localhost:3000/company/users',
    // registerCompany: 'http://localhost:3000/company/register',
}

export const userRoutes = {
    login: `${import.meta.env.VITE_USER_BACKEND_URL}/auth/login`,
    register: `${import.meta.env.VITE_USER_BACKEND_URL}/auth/register`,
    // login: 'http://localhost:3000/auth/login',
    // register: 'http://localhost:3000/auth/register',
}

export const supplierRoutes = {
    get: `${import.meta.env.VITE_USER_BACKEND_URL}/supplier/`,
    register: `${import.meta.env.VITE_USER_BACKEND_URL}/supplier/register`,
    // get: 'http://localhost:3000/supplier/',
    // register: 'http://localhost:3000/supplier/register',
}

export const productRoutes = {
    get: `${import.meta.env.VITE_USER_BACKEND_URL}/product/`,
    register: `${import.meta.env.VITE_USER_BACKEND_URL}/product/register`,
    // get: 'http://localhost:3000/product/',
    // register: 'http://localhost:3000/product/register'
}

export const pythonRoutes = {
    userRegisters : `${import.meta.env.VITE_USER_BACKEND_URL}/apiPython/user/`,
    getRecommendations : `${import.meta.env.VITE_USER_BACKEND_URL}/apiPython/recommendations/`, //:cantidad/:categoria
    getProducts: `${import.meta.env.VITE_USER_BACKEND_URL}/apiPython/products`,
    getProductsCategories : `${import.meta.env.VITE_USER_BACKEND_URL}/apiPython/productsCategorie`,
    // userRegisters : 'http://localhost:3000/apiPython/user/',
    // getRecommendations : 'http://localhost:3000/apiPython/recommendations/', //:cantidad/:categoria
    // getProducts: 'http://localhost:3000/apiPython/products',
    // getProductsCategories : 'http://localhost:3000/apiPython/productsCategorie',
}

export const purchaseRoutes = {
    buyProduct: `${import.meta.env.VITE_USER_BACKEND_URL}/purchase/register`,
    getPurchase: `${import.meta.env.VITE_USER_BACKEND_URL}/purchase/get/`,
    // buyProduct: 'http://localhost:3000/purchase/register',
    // getPurchase: 'http://localhost:3000/purchase/get/',
}