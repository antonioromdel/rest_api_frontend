import { createBrowserRouter } from 'react-router-dom';
import Layouts from './layouts/Layouts';
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products';
import NewProduct, { action as newProductAction} from './views/NewProduct';
import EditProduct, {loader as editProductLoader, action as editProductAction} from './views/EditProduct';
import { action as deleteProductAction} from './components/ProductDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layouts />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'producto/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'producto/:id/editar',
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'producto/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])