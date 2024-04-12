import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const goToProductsPage = () => {
        navigate('/products');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/products/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const allProducts = await response.json();

                const today = new Date();
                const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

                let selectedProducts = [];
                for (let i = 0; i < 3; i++) {
                    const productIndex = (dayOfYear + i) % allProducts.length;
                    selectedProducts.push(allProducts[productIndex]);
                }

                setProducts(selectedProducts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const handleResize = () => setIsMobile(window.innerWidth < 768);

        window.addEventListener('resize', handleResize);
        fetchProducts();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [apiUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const productContainerClass = isMobile ? "flex overflow-x-scroll py-2" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";
    const productCardClass = isMobile ? "min-w-[60%] bg-white rounded-lg shadow p-6 mr-4" : "bg-white rounded-lg shadow p-6";
    const titleClass = isMobile ? "text-xl font-bold mt-2" : "text-3xl font-bold text-center mb-4";
    const descriptionClass = isMobile ? "text-sm mt-1" : "text-md mt-1";

    return (
        <section className="mb-8">
            <h2 className={titleClass} style={{ color: '#8c4322' }}>Featured Products</h2>
            <div className={productContainerClass}>
                {products.map((product, index) => (
                    product && product.imageUrl && (
                        <div key={index} className={productCardClass}>
                            <img src={product.imageUrl} alt={product.name}
                                 className="w-full h-48 object-cover rounded-lg"/>
                            <h3 className={titleClass} style={{ color: '#8c4322' }}>{product.name}</h3>
                            <p className={descriptionClass}>{product.description}</p>
                        </div>
                    )
                ))}
            </div>
            <div className="flex justify-center w-full">
                <button onClick={goToProductsPage}
                        className="mt-4 bg-boulangerie-main text-white py-2 px-4 rounded hover:bg-boulangerie-dark">
                    View All Products
                </button>
            </div>
        </section>
    );
}

export default FeaturedProducts;
