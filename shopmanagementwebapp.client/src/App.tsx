import { useEffect, useState } from 'react';
import './App.css';

interface Product {
    Id: number;
    Name: string;
    Description: string;
    Cost: number;
    ImageSource: string;
    Stock: number;
}

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            const response = await fetch('/api/GetProducts');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
            else {
                console.log("Response not okay");
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div>

        </div>
    );
}

export default App;